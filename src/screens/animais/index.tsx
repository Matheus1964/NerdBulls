import { Header } from '@components/Header'
import { FlatList, Alert } from 'react-native'
import { ButtonText, Container, ContainerTitulo, SelectButton, Title, ButtonContainer, CheckBoxWrapper, ListContainer, HeaderRow, HeaderText, AnimalText } from './styles'
import logoImg from '@assets/logo.png'
import React from 'react';
import {AnimalItem} from './styles';
import CheckBox from 'react-native-check-box'

interface Animal {
  id: string;
  nome: string;
  sexo: string;
  raca: string;
  peso: string;
}

const animals: Animal[] = [
  { id: '001', nome: 'Belinha', sexo: 'F', raca: 'Bulldog', peso: '380' },
  { id: '002', nome: 'Gigi', sexo: 'F', raca: 'Nelore', peso: '490' },
  { id: '003', nome: 'Julinha', sexo: 'M', raca: 'Angus', peso: '190' },
  { id: '004', nome: 'Mimosa', sexo: 'F', raca: 'Brahman', peso: '210' },
  { id: '005', nome: 'Belinha', sexo: 'F', raca: 'Bulldog', peso: '380' },
  { id: '006', nome: 'Gigi', sexo: 'F', raca: 'Nelore', peso: '490' },
  { id: '007', nome: 'Julinha', sexo: 'M', raca: 'Angus', peso: '190' },
  { id: '008', nome: 'Mimosa', sexo: 'F', raca: 'Brahman', peso: '210' },
  { id: '009', nome: 'Belinha', sexo: 'F', raca: 'Bulldog', peso: '380' },
  { id: '010', nome: 'Gigi', sexo: 'F', raca: 'Nelore', peso: '490' },
  { id: '011', nome: 'Julinha', sexo: 'M', raca: 'Angus', peso: '190' },
  { id: '012', nome: 'Mimosa', sexo: 'F', raca: 'Brahman', peso: '210' },
];


export default function Animais() {
  const [selectedAnimal, setSelectedAnimal] = React.useState<string>('');
  
  //funcao que deve direcionar para a tela do animal
  const handleButtonPress = () => {
    if (!selectedAnimal) {
      Alert.alert('Por favor, selecione um animal.');
    } else {
      console.log('Id Animal:', selectedAnimal);
    }
  };

  const renderItem = ({ item }: { item: Animal }) => {
    const isChecked = selectedAnimal === item.id;
  
    return (
      <AnimalItem >
        <AnimalText>{item.id}</AnimalText>
        <AnimalText>{item.nome}</AnimalText>
        <AnimalText>{item.sexo}</AnimalText>
        <AnimalText>{item.raca}</AnimalText>
        <AnimalText>{item.peso}</AnimalText>
        <CheckBoxWrapper>
          <CheckBox
            isChecked={isChecked}
            onClick={() => {
              if (isChecked) {
                setSelectedAnimal('');
              } else {
                setSelectedAnimal(item.id);
              }
            }}
          />
        </CheckBoxWrapper>
      </AnimalItem>
    );
  }

  return (
    <>
      <Header LogoSource={logoImg}/>
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
            keyExtractor={(item) => item.id}
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
