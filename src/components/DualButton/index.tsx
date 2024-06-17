import React from 'react';
import { View, Text } from 'react-native';
import { ContainerButton, ButtonAcessar, ButtonCadastrar } from './styles';
import { useNavigation } from '@react-navigation/native';

interface DualButtonProps {
  onPressAcessar: () => void;
}

export function DualButton({ onPressAcessar }: DualButtonProps) {
  const navigation = useNavigation();

  const handleCadastrar = () => {
    console.log('Cadastrar button pressed');
    navigation.navigate('register'); // Certifique-se de que a rota está corretamente definida como 'register'
  };

  return (
    <ContainerButton>
      <ButtonAcessar onPress={onPressAcessar}>
        <Text>Acessar</Text>
      </ButtonAcessar>
      <ButtonCadastrar onPress={handleCadastrar}>
        <Text>Cadastrar</Text>
      </ButtonCadastrar>
    </ContainerButton>
  );
}
