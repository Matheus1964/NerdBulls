import { Header } from '@components/Header'
import { View, Text, TouchableOpacity } from 'react-native'
import { Container, Botoes } from './styles'
import { useNavigation } from '@react-navigation/native'
import logoImg from '@assets/logo.png'

export default function Home() {
  const navigation = useNavigation();
  function handleAnimais(){
    navigation.navigate('animais')

  }
  function handleCadastroVacina(){
    navigation.navigate('cadastroVacina')

  }

  function handleCadastroAnimais(){
    navigation.navigate('cadastroAnimais')

  }
  
  return (
    <>
      <Header LogoSource={logoImg}/>
      <Container>
        <Text>Home</Text>
        <Botoes onPress={handleCadastroAnimais}>
          <Text>Cadastrar Animais</Text>
        </Botoes>
        <Botoes onPress={handleCadastroVacina}>
          <Text>Cadastrar vacinas</Text>
        </Botoes>
        <Botoes onPress={handleAnimais}>
          <Text>Animais</Text>
        </Botoes>
        <Botoes>
          <Text>Reprodução</Text>
        </Botoes>
      </Container>
    </>
  )
}
