import { useNavigation } from '@react-navigation/native';
import { Logo, BackToButton } from './styles';



type Props = {
  //showBackButton?: boolean;
  LogoSource: any; // Tipagem para a fonte da imagem

}

export function Header({ LogoSource }: Props){
  const navigation = useNavigation();
  function handleGoBack(){
    navigation.goBack();
  }

  return(
    <BackToButton onPress={handleGoBack}>  
      <Logo source={LogoSource}/>
    </BackToButton>
  )
}