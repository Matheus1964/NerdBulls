import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
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
            dataParto: "10/05/2024",
            pai: "Toro Bravo",
            brincoPai: "001",
            racaPai: "Holandesa",
            mae: "Margarida",
            racaMae: "Jersey",
            vacinasRecebidas: [
                { nome: "BVD", data: "01/02/2024" },
                { nome: "IBR", data: "15/03/2024" }
            ]
        }
    },
    { 
        id: 2, 
        brinco: "002", 
        nome: "Gigi", 
        sexo: "F", 
        pesagens: [
            {"data": "28/02/2024", "peso": 490},
            {"data": "01/03/2024", "peso": 495},
            {"data": "02/03/2024", "peso": 488},
            {"data": "03/03/2024", "peso": 493}
        ],
        gestacao: {
            metodoGestacao: "cobertura natural",
            dataParto: "20/06/2024",
            pai: "Valente",
            brincoPai: "002",
            racaPai: "Angus",
            mae: "Daisy",
            racaMae: "Holandesa",
            vacinasRecebidas: [
                { nome: "Clostridial", data: "05/03/2024" },
                { nome: "Leptospirose", data: "20/04/2024" }
            ]
        }
    },
    { 
        id: 3, 
        brinco: "003", 
        nome: "Julinha", 
        sexo: "M", 
        pesagens: [
            {"data": "06/12/2023", "peso": 190},
            {"data": "07/12/2023", "peso": 188},
            {"data": "08/12/2023", "peso": 191},
            {"data": "09/12/2023", "peso": 192}
        ],
        gestacao: {
            metodoGestacao: "inseminação artificial",
            dataParto: "05/07/2024",
            pai: "Granadeiro",
            brincoPai: "003",
            racaPai: "Nelore",
            mae: "Clarinha",
            racaMae: "Guernsey",
            vacinasRecebidas: [
                { nome: "BVD", data: "02/03/2024" },
                { nome: "Raiva", data: "12/05/2024" }
            ]
        }
    },
    { 
        id: 4, 
        brinco: "004", 
        nome: "Julinha", 
        sexo: "M", 
        pesagens: [
            {"data": "22/03/2023", "peso": 210},
            {"data": "23/03/2023", "peso": 208},
            {"data": "24/03/2023", "peso": 211},
            {"data": "25/03/2023", "peso": 209}
        ],
        gestacao: {
            metodoGestacao: "inseminação artificial",
            dataParto: "15/08/2024",
            pai: "Raio",
            brincoPai: "004",
            racaPai: "Hereford",
            mae: "Estrela",
            racaMae: "Ayrshire",
            vacinasRecebidas: [
                { nome: "IBR", data: "18/04/2024" },
                { nome: "Clostridial", data: "25/05/2024" }
            ]
        }
    },
    { 
        id: 5, 
        brinco: "005", 
        nome: "Lulu", 
        sexo: "F", 
        pesagens: [
            {"data": "15/01/2024", "peso": 420},
            {"data": "16/01/2024", "peso": 415},
            {"data": "17/01/2024", "peso": 418},
            {"data": "18/01/2024", "peso": 422}
        ],
        gestacao: {
            metodoGestacao: "cobertura natural",
            dataParto: "30/09/2024",
            pai: "Thunder",
            brincoPai: "005",
            racaPai: "Brahman",
            mae: "Bela",
            racaMae: "Holandesa",
            vacinasRecebidas: [
                { nome: "Leptospirose", data: "01/05/2024" },
                { nome: "Raiva", data: "20/06/2024" }
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
        <ButtonOption>
          <ButtonOptionText>Cadastrar nova pesagem</ButtonOptionText>
        </ButtonOption>
      </ContainerMain>
    </>
  );
}
