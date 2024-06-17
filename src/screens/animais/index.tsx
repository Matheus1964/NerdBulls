import React, { useEffect, useState } from 'react'
import { FlatList, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Header } from '@components/Header'
import logoImg from '@assets/logo.png'
import { getDatabase, ref, onValue } from 'firebase/database'
import { auth } from '../../services/firebaseConfig'

import {
  ButtonText,
  Container,
  ContainerTitulo,
  SelectButton,
  Title,
  ButtonContainer,
  CheckBoxWrapper,
  ListContainer,
  HeaderRow,
  HeaderText,
  AnimalText,
  AnimalItem
} from './styles'
import CheckBox from 'react-native-check-box'

export default function Animais() {
  const [animals, setAnimals] = useState<any[]>([]) // Aqui estamos usando any[] para simplificar, idealmente, use o tipo correto
  const [selectedAnimal, setSelectedAnimal] = useState<string>('')
  const navigation = useNavigation()

  useEffect(() => {
    const loadAnimals = async () => {
      try {
        const currentUser = auth.currentUser // Obter o usuário atualmente autenticado
        if (!currentUser) {
          throw new Error('Nenhum usuário autenticado')
        }

        const db = getDatabase()
        const animalsRef = ref(db, `users/${currentUser.uid}/animais`)

        onValue(animalsRef, snapshot => {
          const data = snapshot.val()
          if (data) {
            const animalsList = Object.values(data)
            setAnimals(animalsList)
          } else {
            setAnimals([])
          }
        })
      } catch (error) {
        console.error('Erro ao carregar os animais:', error)
        Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados dos animais.')
      }
    }

    loadAnimals()
  }, [])

  const handleButtonPress = () => {
    if (!selectedAnimal) {
      Alert.alert('Por favor, selecione um animal.')
    } else {
      const selected = animals.find(animal => animal.id === selectedAnimal)
      if (selected) {
        navigation.navigate('dadosAnimais', { animal: selected })
      }
    }
  }

  const renderItem = ({ item }: { item: any }) => {
    const isChecked = selectedAnimal === item.id

    return (
      <AnimalItem >
        <AnimalText>{item.id}</AnimalText>
        <AnimalText>{item.nome}</AnimalText>
        <AnimalText>{item.sexo}</AnimalText>
        <AnimalText>{item.raca}</AnimalText>
        <AnimalText>{item.pesoNascimento}</AnimalText>
        <CheckBoxWrapper>
          <CheckBox
            isChecked={isChecked}
            onClick={() => {
              if (isChecked) {
                setSelectedAnimal('')
              } else {
                setSelectedAnimal(item.id)
              }
            }}
          />
        </CheckBoxWrapper>
      </AnimalItem>
    )
  }

  return (
    <>
      <Header LogoSource={logoImg} />
      <Container>
        <ContainerTitulo>
          <Title>Escolha um animal</Title>
        </ContainerTitulo>

        <ListContainer>
          <HeaderRow>
            <HeaderText>ID</HeaderText>
            <HeaderText>Nome</HeaderText>
            <HeaderText>Sexo</HeaderText>
            <HeaderText>Raça</HeaderText>
            <HeaderText>Peso (kg)</HeaderText>
            <HeaderText></HeaderText>
          </HeaderRow>

          <FlatList
            data={animals}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </ListContainer>

        <ButtonContainer>
          <SelectButton onPress={() => handleButtonPress()}>
            <ButtonText>Selecionar</ButtonText>
          </SelectButton>
        </ButtonContainer>
      </Container>
    </>
  )
}