import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '@screens/login'
import Home from '@screens/home'
import Animais from '@screens/animais'
import CadastroVacina from '@screens/cadastroVacina'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  //initialRouteName='nome da rota inicial'
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="home" component={Home} />
      <Screen name="animais" component={Animais} />
      <Screen name="cadastroVacina" component={CadastroVacina} />

      
    </Navigator>
  )
}
