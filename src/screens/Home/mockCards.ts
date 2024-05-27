import { CardDataType } from '@components/Cards/type'
import LogoSource from '../../assets/logo.png'
import IconGado from '@assets/IconGado.png'
import IconAnimais from '@assets/IconAnimais.png'
import IconVacina from '@assets/IconVacina.png'

export const cardData: CardDataType[] = [
  { title: 'CADASTRAR GADOS', image: IconGado, link: 'cadastroVacina' },
  { title: 'CADASTRAR VACINAS', image: IconVacina, link: 'home' },
  { title: 'ANIMAIS', image: IconAnimais, link: 'animais' },
  { title: 'REPRODUÇÃO', image: IconAnimais, link: 'animais' },
  { title: 'CONTROLE DE PESO', image: IconAnimais, link: 'animais' }
]
