import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Header } from '@components/Header';
import { 
  Container, ContainerTitulo, NameTitulo,
  ButtonOption, ButtonOptionText, ContainerMain,
  TableHeader, Heading, Row, Row2, Cell, Cell2, Heading2
} from './styles';

import CrossButton from '../../components/CrossButton/'

interface Vacina {
  nome: string;
  data: string;
}

// Temporario
interface Gestacao {
  dataParto: string;
  pai: string;
  racaPai: string;
  mae: string;
  racaMae: string;
  vacinasRecebidas: Vacina[];
  metodoGestacao: string;
  brincoPai: string;
}

interface DataItem {
  id: number; 
  brinco: string; 
  nome: string;
  sexo: string; 
  pesagens: { data: string, peso: number }[];
  gestacao?: Gestacao;
}


export default function Reproduçao() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

    
  const navigation = useNavigation();
  function handleCadastro(){
    navigation.navigate('cadastroGestacao')
  }


  // Temporario
  const data: DataItem[] = [
    { 
        id: 1, 
        brinco: "001", 
        nome: "Belinha", 
        sexo: "F", 
        pesagens: [
            {"data": "26/10/2023", "peso": 380},
            {"data": "27/10/2023", "peso": 375},
            {"data": "28/10/2023", "peso": 378},
            {"data": "29/10/2023", "peso": 382}
        ],
        gestacao: {
            metodoGestacao: "inseminação artificial",
            dataParto: "20/12/2024",
            pai: "Toro Bravo",
            brincoPai: "001",
            racaPai: "Holandesa vermelho e branco",
            mae: "Margarida",
            racaMae: "Mini Gado",
            vacinasRecebidas: [
                { nome: "Raiva", data: "21/06/2024" }
            ]
        }
    }
];


  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  const renderLastPesagem = ({ item }: { item: DataItem }) => {
    const isExpanded = expandedItems.includes(item.id);
    return (
      <View>
        <Row>
          <Cell>#{item.brinco}</Cell>
          <Cell>{item.nome}</Cell>
          <Cell>{item.gestacao?.pai}</Cell>
          <Cell>{item.gestacao?.dataParto}</Cell>
          <CrossButton 
            onPress={() => toggleExpand(item.id)} 
            source={require('../../assets/setaIcon.png')} 
          />
        </Row>

        {isExpanded && item.gestacao && (
  <View>
    <TableHeader>
      <Heading2>PAI</Heading2>
      <Heading2>METODO GESTAÇÃO</Heading2>
    </TableHeader>
    <Row>
      <Cell2>#{item.gestacao.brincoPai} {item.gestacao.pai}</Cell2>
      <Cell2>{item.gestacao.metodoGestacao}</Cell2>
    </Row>
                
    <TableHeader>
      <Heading2>RAÇA DO PAI</Heading2>
      <Heading2>RAÇA DA MÃE</Heading2>
    </TableHeader>
    <Row>
      <Cell2>{item.gestacao.racaMae}</Cell2>
      <Cell2>{item.gestacao.racaPai}</Cell2>
    </Row>

    <TableHeader>
      <Heading2>VACINAS RECEBIDAS</Heading2>
      <Heading2>DATA</Heading2>
    </TableHeader>
    {item.gestacao.vacinasRecebidas.map((vacina, index) => (
      <Row2 key={index}>
        <Cell2>{vacina.nome}</Cell2>
        <Cell2>{vacina.data}</Cell2>
      </Row2>
    ))}
  </View>
)}

      </View>
    );
  };

  return (
    <>
      <Header LogoSource={ require('../../assets/logo.png')}/>
      <ContainerTitulo>
        <NameTitulo>Escolha um animal</NameTitulo>
      </ContainerTitulo>
      <ContainerMain>
        <TableHeader style={{ backgroundColor: '#f0f0f0' }}>
          <Heading>BRINCO</Heading>
          <Heading>MÃE</Heading>
          <Heading >PAI</Heading>
          <Heading style={{ paddingLeft: 1}}>DATA PREVISTA DE PARTO</Heading>
          <CrossButton 
            style={{ opacity: 0 }}
            source={require('../../assets/setaIcon.png')} 
          />
        </TableHeader>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLastPesagem}
        />
        <ButtonOption onPress={handleCadastro}>
          <ButtonOptionText>Cadastrar nova gestação</ButtonOptionText>
        </ButtonOption>
      </ContainerMain>
    </>
  );
}
