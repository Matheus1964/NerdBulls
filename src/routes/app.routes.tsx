import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '@screens/Login'
import Home from '@screens/Home'
import Animais from '@screens/animais'
import CadastroVacina from '@screens/cadastroVacina'
<<<<<<< HEAD
import Acesse from '@screens/acesso'
=======
import CadastroAnimais from '@screens/cadastroAnimais'
>>>>>>> Taiyo

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  //initialRouteName='nome da rota inicial'
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="home" component={Home} />
      <Screen name="animais" component={Animais} />
      <Screen name="cadastroVacina" component={CadastroVacina} />
<<<<<<< HEAD
      <Screen name="acesse" component={Acesse} />
=======
      <Screen name="cadastroAnimais" component={CadastroAnimais} />
      
>>>>>>> Taiyo
    </Navigator>
  )
}
