import React from 'react'
import { Text, View, Button, TouchableOpacity, BackHandler } from 'react-native'
import img_Boi from '@assets/pexels.png'
import iconGoogle from '@assets/googleIcon.png'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  MainImg,
  ContainerTitulo,
  NameTitulo,
  NameSubTitulo,
  ButtonGmail,
  ImgGoogle,
  ButtonGoogle,
  ButtonOption,
  ButtonOptionText
} from './styles'

export default function Home() {
  const navigation = useNavigation();
  function handleAcesso(){
    navigation.navigate('acesse')

  }
  function handleExit() {
    BackHandler.exitApp(); // Função para sair do aplicativo
  }

  return (
   
     <Container>
      <MainImg source={img_Boi} />
      <ContainerTitulo>
        <NameTitulo>Seja Bem vindo!</NameTitulo>
        <NameSubTitulo>Como deseja acessar?</NameSubTitulo>
      </ContainerTitulo>
      <ButtonGmail onPress={handleAcesso}>
        <ButtonGoogle>Entrar</ButtonGoogle>
      </ButtonGmail>
      <ButtonOption onPress={handleExit}>
        <ButtonOptionText >Sair</ButtonOptionText>
        
      </ButtonOption>
      </Container>
    
  )
}
