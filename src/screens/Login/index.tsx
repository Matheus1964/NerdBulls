import React from 'react'
import { Image } from 'expo-image'
import { Text, View, Button, TouchableOpacity } from 'react-native'
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
  function handleHome(){
    navigation.navigate('home')

  }
  return (
    <Container>
      <MainImg source={img_Boi} />
      <ContainerTitulo>
        <NameTitulo>Seja Bem vindo!</NameTitulo>
        <NameSubTitulo>Como deseja acessar?</NameSubTitulo>
      </ContainerTitulo>
      <ButtonGmail onPress={handleHome}>
        <ImgGoogle source={iconGoogle} />
        <ButtonGoogle>Entrar com o Google</ButtonGoogle>
      </ButtonGmail>
      <ButtonOption>
        <ButtonOptionText>Outras opções</ButtonOptionText>
      </ButtonOption>
    </Container>
  )
}
