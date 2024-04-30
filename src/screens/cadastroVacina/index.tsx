import { Header } from '@components/Header'
import { View, Text, TouchableOpacity } from 'react-native'
import { Container } from './styles'
import { useNavigation } from '@react-navigation/native'

export default function CadastroVacina() {
  
  
  
  return (
    <>
      <Header />
      <Container>
        <TouchableOpacity>
          <Text>Cadastrar vacinas</Text>
        </TouchableOpacity>

      </Container>
    </>
  )
}
