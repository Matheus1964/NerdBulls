import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '@screens/Login'
import Home from '@screens/Home'
import Animais from '@screens/animais'
import CadastroVacina from '@screens/cadastroVacina'
import Acesse from '@screens/acesso'
import CadastroAnimais from '@screens/cadastroAnimais'
import ControlePeso from '@screens/controlePeso'
import Reproduçao from '@screens/reproduçao'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  //initialRouteName='nome da rota inicial'
  return (
    <Navigator screenOptions={{ headerShown: false }}>

      <Screen name="reproduçao" component={Reproduçao} />
      
    </Navigator>
  )
}
