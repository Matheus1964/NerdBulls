import { ThemeProvider } from "styled-components";
import { Container, LoadIndicator } from "./styles";
import theme from "@theme/index";

export function Loading(){
  return(
    <Container>
      <LoadIndicator/>
    </Container>
    
  )
}