import json, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from scipy import ndimage as nd
import os; D=os.path.dirname(os.path.abspath(__file__))+'/'; I=D+'src/'
O=D
src=Image.open(I+'mascot-phone.png').convert('RGB'); a=np.asarray(src).astype(int); H,W=a.shape[:2]
r,g,b=a[...,0],a[...,1],a[...,2]; mx,mn=a.max(2),a.min(2); lum=a.mean(2)

# phone body: geometric rounded rect
pm=Image.new('L',(W,H),0); ImageDraw.Draw(pm).rounded_rectangle((388,47,713,722),radius=46,fill=255)
phone=np.asarray(pm)>127

# background: neutral, fairly light pixels connected to the border (includes the AI's grey ground shadows)
cand=(mx-mn<=22)&(lum>100)&~phone
lab,_=nd.label(cand); edge=set(np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]))-{0}
bg=np.isin(lab,list(edge))
# enclosed light pockets (e.g. gap between frame, arm and body)
pock=(mx-mn<=22)&(lum>190)&~phone&~bg
lab2,n2=nd.label(pock); sizes=nd.sum(pock,lab2,range(1,n2+1))
bg|=np.isin(lab2,[i+1 for i,s in enumerate(sizes) if s>15])
obj=~bg

# green screen -> transparent, with despill on the fringe
gness=g-np.maximum(r,b)
screen=phone&(gness>40)
fringe=phone&(gness>8)&~screen
alpha=np.where(obj,255,0).astype(float)
alpha=np.asarray(Image.fromarray(alpha.astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))).astype(float)
alpha[screen]=0
alpha[fringe]=np.clip(255-(gness[fringe]-8)*255/32,0,255)
out=a.copy(); gg=out[...,1]; gg[fringe]=np.maximum(r,b)[fringe]; gg[screen]=0; out[...,1]=gg
rgba=np.dstack([out,alpha]).astype(np.uint8)

# mascot mask (for the lean shadow): everything outside the phone + coral/outline of the hand on the bezel
coral=(r>190)&(r-g>70)
hand=nd.binary_dilation(coral&phone,iterations=5)&phone&~screen&(gness<=8)
mascot=(obj&~phone)|hand
mascot_img=Image.fromarray((mascot*255).astype(np.uint8))

def shadow(dx,dy,blur,strength):
    sh=Image.new('L',(W,H),0); sh.paste(mascot_img,(dx,dy))
    sh=np.asarray(sh.filter(ImageFilter.GaussianBlur(blur))).astype(float)/255
    keep=phone&~nd.binary_dilation(mascot,iterations=1)
    return sh*keep*strength
s=np.maximum(shadow(-24,12,11,0.55), shadow(-6,4,3,0.4))  # soft cast + tight contact
sh_rgba=np.dstack([np.zeros((H,W,3)),s*255]).astype(np.uint8)

# crop to content
ys,xs=np.nonzero(alpha>10|screen) if False else np.nonzero((alpha>10)|screen)
x0,x1,y0,y1=int(xs.min())-4,int(xs.max())+5,int(ys.min())-4,int(ys.max())+5
Image.fromarray(rgba).crop((x0,y0,x1,y1)).save(O+'cutout.png')
Image.fromarray(sh_rgba).crop((x0,y0,x1,y1)).save(O+'leanshadow.png')
sy,sx=np.nonzero(screen)
mys,mxs=np.nonzero(mascot)
meta=dict(w=int(x1-x0),h=int(y1-y0),
  screen=dict(x=int(sx.min()-x0),y=int(sy.min()-y0),w=int(sx.max()-sx.min()+1),h=int(sy.max()-sy.min()+1)),
  phone=dict(x=388-x0,y=47-y0,w=325,h=675),
  mascot=dict(x=int(mxs.min()-x0),w=int(mxs.max()-mxs.min()+1),bottom=int(mys.max()-y0)))
json.dump(meta,open(O+'meta.json','w')); print(meta)

# app screenshot: replace the red recording pill with a plain clock
sc=Image.open(I+'home-screen.jpg').convert('RGB'); d=ImageDraw.Draw(sc)
d.rounded_rectangle((52,8,200,68),radius=10,fill=(246,244,247))
f=ImageFont.truetype('/System/Library/Fonts/SFNS.ttf',31)
try: f.set_variation_by_name('Semibold')
except Exception as e: print('font var',e)
d.text((122,38),'13:47',font=f,fill=(20,20,22),anchor='mm')
sc.save(O+'screen.png')

lg=Image.open(I+'logo.png').convert('RGBA'); lg.crop((105,93,394,429)).save(O+'logo.png'); print('logo',lg.getbbox())
