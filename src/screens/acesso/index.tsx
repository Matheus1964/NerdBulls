import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Header } from '@components/Header'
import imgBack from '@assets/logo.png'
import {
  TitlleMain,
  TitlleSecondary,
  InputEmail,
  ContainerEmail,
  ContainerSenha,
  ContainerCheckBox
} from './styles'
import { CheckBox } from '@components/CheckBox'
import { DualButton } from '@components/DualButton'

export default function Acesso() {
  const handleCheckBoxPress = (state:boolean) => {
    console.log('Checkbox state:', state)
  }
  const handleAcessar = () => {
    console.log('Acessar button pressed');
    // Adicione a lógica de acesso aqui
  };

  const handleCadastrar = () => {
    console.log('Cadastrar button pressed');
    // Adicione a lógica de cadastro aqui
  };

  return (
    <View>
      <Header LogoSource={imgBack} />
      <TitlleMain>Acesse</TitlleMain>
      <TitlleSecondary>Com e-mail e senha para entrar</TitlleSecondary>
      <ContainerEmail>
        <Text>E-mail</Text>
        <InputEmail
          placeholder="Digite o seu e-mail"
          keyboardType="email-address"
        />
      </ContainerEmail>
      <ContainerSenha>
        <Text>Senha</Text>
        <TextInput
          placeholder="Digite a sua senha"
          secureTextEntry
          keyboardType="default"
        />
      </ContainerSenha>
      <ContainerCheckBox>
        <CheckBox
          isActive={false}
          label="Lembrar minha senha"
          onPressCheckBox={handleCheckBoxPress}
        />
        <TouchableOpacity>
          <Text>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      </ContainerCheckBox>
      <DualButton onPressAcessar={handleAcessar} onPressCadastrar={handleCadastrar} />
    </View>
  )
}
