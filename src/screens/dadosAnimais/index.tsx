import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootParamList } from './path-to-declaration-file'; // ajuste o caminho conforme necessário
import { Header } from '@components/Header';
import logoImg from '@assets/logo.png';
import { Label, InfoAnimal, Container,Title_pg } from './styles';
import { ref, get } from 'firebase/database';
import { database } from '../../services/firebaseConfig'; // ajuste o caminho conforme necessário

type AnimalDetailsRouteProp = RouteProp<RootParamList, 'dadosAnimais'>;

interface Animal {
  key: string;
  brinco: string;
  brincoEletronico: string;
  dataNascimento: string;
  id: number;
  nome: string;
  pesoNascimento: string;
  raca: string;
  registro: string;
  sexo: string;
  vacinas?: Vacina[]; // Atualização para refletir o campo correto
}

interface Vacina {
  id: string;
  nomeVacina: string;
  qtAdministrada: string;
  viaDeAdministracao: string;
}

const AnimalDetails = () => {
  const route = useRoute<AnimalDetailsRouteProp>();
  const { animal } = route.params;
  const [vacinas, setVacinas] = useState<Vacina[]>([]);

  useEffect(() => {
    if (animal && animal.key) {
      console.log('Animal recebido:', animal);
      fetchVacinas(animal.vacinas);
    } else {
      console.warn('Animal não recebido corretamente:', animal);
    }
  }, [animal]);

  const fetchVacinas = async (vacinasData: any) => {
    try {
      const vacinasList: Vacina[] = [];

      // Iterando sobre as chaves de vacinas dentro de vacinasData
      Object.keys(vacinasData).forEach((vacinaKey) => {
        const vacina = vacinasData[vacinaKey];
        vacinasList.push({
          id: vacinaKey,
          ...vacina
        });
      });

      console.log('Vacinas encontradas:', vacinasList);
      setVacinas(vacinasList);
    } catch (error) {
      console.error('Erro ao buscar vacinas:', error);
    }
  };

  return (
    <View>
      <Header LogoSource={logoImg} />
      <ScrollView>
        <Title_pg>Dados do Animal</Title_pg>
        <Container>
          <Label>Brinco: </Label>
          <InfoAnimal>{animal.brinco}</InfoAnimal>
          <Label>Brinco Eletrônico: </Label>
          <InfoAnimal>{animal.brincoEletronico}</InfoAnimal>
          <Label>Registro: </Label>
          <InfoAnimal>{animal.registro}</InfoAnimal>
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
          <Label>Vacinas:</Label>
          {vacinas.length > 0 ? (
            vacinas.map((vacina, index) => (
              <View key={vacina.id}>
                <Label>Nome da Vacina:</Label>
                <InfoAnimal>{vacina.nomeVacina}</InfoAnimal>
                <Label>Quantidade Administrada:</Label>
                <InfoAnimal>{vacina.qtAdministrada}</InfoAnimal>
                <Label>Via de Administração:</Label>
                <InfoAnimal>{vacina.viaDeAdministracao}</InfoAnimal>
              </View>
            ))
          ) : (
            <Text>Não possui vacinas cadastradas</Text>
          )}
        </Container>
      </ScrollView>
    </View>
  );
};

export default AnimalDetails;
