import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Header } from '@components/Header';
import logoImg from '@assets/logo.png'
import { 
  Container, ContainerTitulo, NameTitulo,
  ButtonOption, ButtonOptionText, ContainerMain,
  TableHeader, Heading, Row, Cell, Cell2
} from './styles';

import CrossButton from '../../components/CrossButton/'

interface DataItem {
    id: number; 
    brinco: string; 
    nome: string;
    sexo: string; 
    pesagens: { data: string, peso: number }[];
}

export default function ControlePeso() {
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

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
            ]
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
            ]
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
            ]
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
            ]
        }
    ];

    const toggleExpand = (id: number) => {
        setExpandedItems((prev) => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const renderLastPesagem = ({ item }: { item: DataItem }) => {
        const ultimaPesagem = item.pesagens[item.pesagens.length - 1]; // Mudar pra pegar pela data mais recente
        const isExpanded = expandedItems.includes(item.id);
        return (
            <View>
                <Row>
                    <Cell>#{item.brinco}</Cell>
                    <Cell>{item.nome}</Cell>
                    <Cell>{item.sexo}</Cell>
                    <Cell>{ultimaPesagem.data}</Cell>
                    <Cell>{ultimaPesagem.peso}kg</Cell>
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
                        <Cell2 style={{ paddingRight: 12 }}>{pesagem.peso}kg</Cell2>
                        
                    </Row>
                ))}
            </View>
        );
    };

    return (
        <>
            <Header LogoSource={logoImg}/>
            <ContainerTitulo>
                <NameTitulo>Escolha um animal (incompleto)</NameTitulo>
            </ContainerTitulo>
            <ContainerMain>
                <TableHeader>
                    <Heading>Brinco</Heading>
                    <Heading>Nome</Heading>
                    <Heading>Sexo</Heading>
                    <Heading>Data da pesagem</Heading>
                    <Heading>Peso</Heading>
                    
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
