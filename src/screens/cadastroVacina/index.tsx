import { Header } from '@components/Header'
import { View, Text, TouchableOpacity } from 'react-native'
import { Container } from './styles'
import { useNavigation } from '@react-navigation/native'
import logoImg from '@assets/logo.png'

export default function CadastroVacina() {
  
  
  
  return (
    <>
      <Header LogoSource={logoImg}/>
      <Container>
        <TouchableOpacity>
          <Text>Cadastrar vacinas</Text>
        </TouchableOpacity>

      </Container>
    </>
  )
}
