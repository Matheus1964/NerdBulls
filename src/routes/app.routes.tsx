import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '@screens/Login'
import Home from '@screens/Home'
import Animais from '@screens/animais'
import CadastroVacina from '@screens/cadastroVacina'
import Acesse from '@screens/acesso'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  //initialRouteName='nome da rota inicial'
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="home" component={Home} />
      <Screen name="animais" component={Animais} />
      <Screen name="cadastroVacina" component={CadastroVacina} />
      <Screen name="acesse" component={Acesse} />
    </Navigator>
  )
}
