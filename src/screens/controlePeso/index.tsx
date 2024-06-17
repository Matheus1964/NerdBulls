import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { Header } from '@components/Header';
import logoImg from '@assets/logo.png';
import { 
  Container, ContainerTitulo, NameTitulo,
  ButtonOption, ButtonOptionText, ContainerMain,
  TableHeader, Heading, Row, Cell, Cell2
} from './styles';
import CrossButton from '../../components/CrossButton/';
import { getDatabase, ref, get } from 'firebase/database';
import { auth } from '../../services/firebaseConfig'; // Importe o auth do firebaseConfig

interface DataItem {
  id: number; 
  brinco: string; 
  nome: string;
  sexo: string; 
  pesagens: { data: string, peso: number }[];
}

export default function ControlePeso() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      fetchData(currentUser.uid);
    } else {
      setLoading(false); // Não há usuário logado
    }
  }, []);

  const fetchData = async (uid: string) => {
    const dbRef = ref(getDatabase(), `users/${uid}/animais`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const animalsData = snapshot.val();
      const animalsList = Object.keys(animalsData).map(key => ({
        id: animalsData[key].id,
        brinco: animalsData[key].brinco,
        nome: animalsData[key].nome,
        sexo: animalsData[key].sexo,
        pesagens: animalsData[key].pesagens ? Object.values(animalsData[key].pesagens) : []
      }));
      setData(animalsList);
    } else {
      console.log("No data available");
    }
    setLoading(false);
  };

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderLastPesagem = ({ item }: { item: DataItem }) => {
    const ultimaPesagem = item.pesagens && item.pesagens.length > 0 ? item.pesagens[item.pesagens.length - 1] : null;
    const isExpanded = expandedItems.includes(item.id);
    return (
      <View>
        <Row>
          <Cell>#{item.brinco}</Cell>
          <Cell>{item.nome}</Cell>
          <Cell>{item.sexo}</Cell>
          {ultimaPesagem ? (
            <>
              <Cell>{ultimaPesagem.data}</Cell>
              <Cell>{ultimaPesagem.peso}kg</Cell>
            </>
          ) : (
            <>
              <Cell>Data não disponível</Cell>
              <Cell>Peso não disponível</Cell>
            </>
          )}
          <CrossButton 
            onPress={() => toggleExpand(item.id)} 
            source={require('../../assets/arrowdown.png')} 
          />
        </Row>
        {isExpanded && item.pesagens.slice(0, -1).map((pesagem, index) => (
          <Row key={index}>
            <Cell></Cell>
            <Cell></Cell>
            <Cell></Cell>
            <Cell2>{pesagem.data}</Cell2>
            <Cell2 style={{ paddingRight: 15 }}>{pesagem.peso}kg</Cell2>
          </Row>
        ))}
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <>
      <Header LogoSource={logoImg}/>
      <ContainerTitulo>
        <NameTitulo>Escolha um animal</NameTitulo>
      </ContainerTitulo>
      <ContainerMain>
        <TableHeader>
          <Heading>BRINCO</Heading>
          <Heading>NOME</Heading>
          <Heading>SEXO</Heading>
          <Heading>DATA DA PESAGEM</Heading>
          <Heading style={{ paddingLeft: 5}}>PESO</Heading>
          <CrossButton 
            style={{ opacity: 0 }}
            source={require('../../assets/arrowdown.png')} 
          />
        </TableHeader>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLastPesagem}
        />
        <ButtonOption>
          <ButtonOptionText>Cadastrar nova pesagem</ButtonOptionText>
        </ButtonOption>
      </ContainerMain>
    </>
  );
}
