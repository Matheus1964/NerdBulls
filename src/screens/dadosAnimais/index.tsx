import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootParamList } from './path-to-declaration-file'; // ajuste o caminho conforme necessário
import { Header } from '@components/Header';
import logoImg from '@assets/logo.png';
import { Label, InfoAnimal, Container } from './styles';

type AnimalDetailsRouteProp = RouteProp<RootParamList, 'dadosAnimais'>;

const AnimalDetails = () => {
  const route = useRoute<AnimalDetailsRouteProp>();
  const { animal } = route.params;

  return (
    <View>
      <Header LogoSource={logoImg} />
      <Text>Dados do Animal</Text>
      <Container>
        <Label>Brinco: </Label>
        <InfoAnimal>{animal.brinco}</InfoAnimal>
        <Label>Brinco Eletrônico: </Label>
        <InfoAnimal>{animal.brincoEletronico}</InfoAnimal>
        <Label>Registro: </Label>
        <InfoAnimal>{animal.id}</InfoAnimal>
        <Label>Nome: </Label>
        <InfoAnimal>{animal.nome}</InfoAnimal>
        <Label>Raça: </Label>
        <InfoAnimal>{animal.raca}</InfoAnimal>
        <Label>Data de Nascimento: </Label>
        <InfoAnimal>{animal.dataNascimento}</InfoAnimal>
        <Label>Peso: </Label>
        <InfoAnimal>{animal.pesoNascimento} kg</InfoAnimal>
        <Label>Sexo: </Label>
        <InfoAnimal>{animal.sexo}</InfoAnimal>
        <Label>Vacinas: </Label>
        <InfoAnimal>{animal.vacina ? animal.vacina : 'Não possui vacina'}</InfoAnimal>
      </Container>
    </View>
  );
};

export default AnimalDetails;
