import { Header } from '@components/Header'
import { Cards } from '@components/Cards'
import { View, Text, TouchableOpacity } from 'react-native'
import { Container } from './styles'
import logoImg from '@assets/logo.png'
import { cardData } from './mockCards'



export default function Animais() {
  return (
    <>
      <Header LogoSource={logoImg} />
      <Text>dasdasd</Text>
      <Cards card={cardData}/>
    </>
  )
}
