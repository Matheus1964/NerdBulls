import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Header } from '@components/Header';
import imgBack from '@assets/logo.png';
import {
  TitlleMain,
  TitlleSecondary,
  InputEmail,
  ContainerEmail,
  ContainerSenha,
  ContainerCheckBox
} from './styles';
import { CheckBox } from '@components/CheckBox';
import { DualButton } from '@components/DualButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../services/firebaseConfig'; // Importe o objeto 'auth' configurado
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Acesso() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadStoredCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPassword = await AsyncStorage.getItem('password');

        if (storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);
          setRememberPassword(true);
        }
      } catch (error) {
        console.error('Error loading stored credentials:', error);
      }
    };

    loadStoredCredentials();
  }, []);

  const handleCheckBoxPress = state => {
    setRememberPassword(state);
  };

  const handleAcessar = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('home');

      if (rememberPassword) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
      }
    } catch (error) {
      const errorMessage = error.message;
      Alert.alert('Erro', errorMessage);
    }
  };

  const handleCadastrar = () => {
    console.log('Cadastrar button pressed');
    // Adicione a lógica de cadastro aqui, se necessário
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
          value={email}
          onChangeText={setEmail}
        />
      </ContainerEmail>
      <ContainerSenha>
        <Text>Senha</Text>
        <TextInput
          placeholder="Digite a sua senha"
          secureTextEntry
          keyboardType="default"
          value={password}
          onChangeText={setPassword}
        />
      </ContainerSenha>
      <ContainerCheckBox>
        <CheckBox
          isActive={rememberPassword}
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
  );
}
