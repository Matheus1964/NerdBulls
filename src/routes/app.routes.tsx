import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@screens/Login';
import Home from '@screens/Home';
import Animais from '@screens/animais';
import CadastroVacina from '@screens/cadastroVacina';
import Acesse from '@screens/acesso';
import CadastroAnimais from '@screens/cadastroAnimais';
import ControlePeso from '@screens/controlePeso';
import AnimalDetails from '@screens/dadosAnimais'; 
import Register from '@screens/register';
import Tutorial from '@screens/tutorial'
import Reproduçao from '@screens/reproduçao'
import CadastroGestação from '@screens/cadastroGestacao'

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="home" component={Home} />
      <Screen name="animais" component={Animais} />
      <Screen name="cadastroVacina" component={CadastroVacina} />
      <Screen name="acesse" component={Acesse} />
      <Screen name="cadastroAnimais" component={CadastroAnimais} />
      <Screen name="controlePeso" component={ControlePeso} />
      <Screen name="dadosAnimais" component={AnimalDetails} />
      <Screen name="register" component={Register} />
      <Screen name="tutorial" component={Tutorial} />
      <Screen name="reproduçao" component={Reproduçao} />
      <Screen name="cadastroGestacao" component={CadastroGestação} />
    </Navigator>
  );
}
