import caloriaBanner   from '../assets/images/caloriaBanner.jpg'
import caloriaScreens  from '../assets/images/caloriaScreens.png'
import frogNinjaCover  from '../assets/images/frogNinjaCover.png'
import plataformer2D   from '../assets/images/plataformer2D.png'
import webFreelance1   from '../assets/images/webFreelance1.png'
import webFreelance2   from '../assets/images/webFreelance2.png'
import webFreelance3   from '../assets/images/webFreelance3.png'

export const projectImages = [
  caloriaBanner,
  webFreelance3,
  frogNinjaCover,
]

export const projectMeta = [
  {
    coverImage:      caloriaScreens,
    videoUrl:        'https://youtube.com/shorts/SMwFc1f5Tf8',
    repoUrl:         'https://github.com/briansittmann/CalorIA_SDK53',
    repoBackUrl:     'https://github.com/briansittmann/caloria-backend',
    presentationUrl: '/Presentacion_CalorIA.pdf',
  },
  {
    carouselImages: [webFreelance1, webFreelance2, webFreelance3],
    videoUrl:       null,
    repoUrl:        null,
  },
  {
    coverImage: plataformer2D,
    videoUrl:   'https://www.youtube.com/watch?v=5bU7d4cKiBE',
    repoUrl:    'https://github.com/briansittmann/plataformer2D',
  },
]
