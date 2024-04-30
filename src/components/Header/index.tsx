import { Container, Logo } from './styles';
import logoImg from '@assets/logo.png'

type Props = {
  showBackButton?: boolean;

}

export function Header(){
  return(
    <Container>
      <Logo source={logoImg}/>
    </Container>
  )
}