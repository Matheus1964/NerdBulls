import React from 'react'
import { View, Button, TouchableOpacity, Text } from 'react-native'
import { ContainerButton, ButtonAcessar, ButtonCadastrar } from './styles'

interface DualButtonProps {
  onPressAcessar: () => void
  onPressCadastrar: () => void
}

export function DualButton({
  onPressAcessar,
  onPressCadastrar
}: DualButtonProps) {
  return (
    <ContainerButton>
      <ButtonAcessar onPress={onPressAcessar}>
        <Text>Acessar</Text>
      </ButtonAcessar>
      <ButtonCadastrar onPress={onPressCadastrar}>
        <Text>Cadastrar</Text>
      </ButtonCadastrar>
    </ContainerButton>
  )
}
