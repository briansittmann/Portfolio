import caloriaBanner  from '../assets/images/caloriaBanner.jpg'
import caloriaScreens from '../assets/images/caloriaScreens.png'
import frogNinjaCover  from '../assets/images/frogNinjaCover.png'
import plataformer2D   from '../assets/images/plataformer2D.png'

const FREELANCE_PLACEHOLDER_1 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm3vtCmiDhgKNy4tsiU2lhI9Jus3y765YyRzDgfFrYiYj_SsbdFc5cSq4d5UgNeLw3N5Hu4XCHlas2i5dGcpFtfU4oFScHR0c3x_Ms2TgmdIT2UAKGn3aRSdaUVmsT4CAPfZQ4UjG1obxoNepolIt954BdQKJrgfp8FNTSEW1BulpiknE4zwH6S8wMUjMcFUahV4EdHU5kSHFFNDbIpUHZT7s5ke6xHMR5g-NHpZuLHW3SW-1V6FDTQpiVwwwbHNy5XiGmCf8KS-8'
const FREELANCE_PLACEHOLDER_2 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJuunPksPjWXBeG0iMJr6boAv4YiurydjziMv8IlrUPaHz74izcpT1nl6tcUJaQ2qL5_GZMXKOhq46GeToJHxmDa40_twOTAkKgfeEnz_sgFGGkxkXVyF0IE8wPNh9otEIuTlqU4M6n5_n7lhRGz_bPxmaPueLP80g8QlryqPTQFhNbjUY5Fl5-4F-hchAsNAURp07iT7azUPgrJXhFGYlLkb9B4AMtjmGQ1RMrIcvdzRZi1CxyWCkaRuwIWvfHzeFdbI4nqlGVrM'
const FREELANCE_PLACEHOLDER_3 = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXjH4pMw1hyyFWZv6ukwPJS3F_3wv6FYFkHO6jVIpsPWFLi4O90tANlO9BVOzELSR3hmRIEHpiTfojy_2iIuzvwHmM6bpiO4yvuxHD4COBmYOYnlkl9Xh3kQcv1Y-4DcfrB_Q-LV2z1FK-_BUhE5yLNYcqGs5IU2qYBchjeAEWPB2r8lu28aWj58bDhjvNJzaiyqWoHym2wFF6e02yri4WquO1bTiuw7eBqD1P-nDsZX99J_xwp7OmmwfsEIzLdCEWIE0tUmZyaq0'

export const projectImages = [
  caloriaBanner,
  FREELANCE_PLACEHOLDER_1,
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
    carouselImages: [FREELANCE_PLACEHOLDER_1, FREELANCE_PLACEHOLDER_2, FREELANCE_PLACEHOLDER_3],
    videoUrl:       null,
    repoUrl:        null,
  },
  {
    coverImage: plataformer2D,
    videoUrl:   'https://www.youtube.com/watch?v=5bU7d4cKiBE',
    repoUrl:    'https://github.com/briansittmann/plataformer2D',
  },
]
