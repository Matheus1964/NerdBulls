import { Header } from '@components/Header'
import { View, Text, TouchableOpacity } from 'react-native'
import { Container } from './styles'
import logoImg from '@assets/logo.png'

export default function Animais() {
  return (
    <>
      <Header LogoSource={logoImg}/>
      <Container>
        <Text>Cadastre um animal</Text>
        
      </Container>
    </>
  )
}
