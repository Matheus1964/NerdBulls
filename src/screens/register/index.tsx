import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Header } from '@components/Header'
import imgBack from '@assets/logo.png'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {
  TitlleMain,
  TitlleSecondary,
  InputEmail,
  ContainerEmail,
  ContainerSenha,
  ButtonRegister
} from './styles'
import { Ionicons } from '@expo/vector-icons'
import { auth } from '../../services/firebaseConfig'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigation = useNavigation()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user
        Alert.alert('Success', 'Usuário Registrado com sucesso')
        navigation.navigate('acesse')
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        Alert.alert('Error', errorMessage)
      })
  }

  return (
    <View>
      <Header LogoSource={imgBack} />
      <TitlleMain>Cadastre-se</TitlleMain>
      <TitlleSecondary>Informe seu e-mail e crie uma senha</TitlleSecondary>
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Digite a sua senha"
            secureTextEntry={!passwordVisible}
            keyboardType="default"
            value={password}
            onChangeText={setPassword}
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} />
          </TouchableOpacity>
        </View>
      </ContainerSenha>
      <ButtonRegister onPress={handleRegister}>
        <Text>Registrar</Text>
      </ButtonRegister>
    </View>
  )
}
