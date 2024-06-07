import React, { useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { Header } from '@components/Header';
import logoImg from '@assets/logo.png';
import { 
  Container, ContainerTitulo, NameTitulo,
  ButtonOption, ButtonOptionText, ContainerMain,
  TableHeader, Heading, Row, Cell, Cell2
} from './styles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { parse, isValid } from 'date-fns';

import CrossButton from '../../components/CrossButton/';

interface DataItem {
    id: number; 
    brinco: string; 
    nome: string;
    sexo: string; 
    pesagens: { data: string, peso: number }[];
}

export default function ControlePeso() {
    const [itemsExpandidos, setItemsExpandidos] = useState<number[]>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [modalVisivel, setModalVisivel] = useState<boolean>(false);
    const [idAnimalSelecionado, setIdAnimalSelecionado] = useState<number | null>(null);
    const [novaPesagemData, setNovaPesagemData] = useState<string>('');
    const [novaPesagemPeso, setNovaPesagemPeso] = useState<string>('');
    
    const [data, setData] = useState<DataItem[]>([
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
    ]);

    const toggleExpand = (id: number) => {
        setItemsExpandidos((prev) => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleCrossButtonPress = (id: number) => {
        if (isAdding) {
            setIdAnimalSelecionado(id);
            setModalVisivel(true);
        } else {
            toggleExpand(id);
        }
    };

    const adicionarPesagem = () => {
        if (idAnimalSelecionado !== null && novaPesagemData.trim() !== '' && !isNaN(parseFloat(novaPesagemPeso))) {
            const isValidDate = validateDate(novaPesagemData);
            if (isValidDate) {
                const updatedData = data.map(item => {
                    if (item.id === idAnimalSelecionado) {
                        return {
                            ...item,
                            pesagens: [
                                ...item.pesagens,
                                { data: novaPesagemData, peso: parseFloat(novaPesagemPeso) }
                            ]
                        };
                    }
                    return item;
                });
                setData(updatedData);
                setModalVisivel(false);
                setNovaPesagemData('');
                setNovaPesagemPeso('');
            } else {
                Alert.alert('Atenção!', 'A data de pesagem inserida não é válida.');
            }
        } else {
            Alert.alert('Atenção!', 'Preencha todos os campos corretamente.');
        }
    };
    
    const validateDate = (date: string): boolean => {
        try {
            const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
            return isValid(parsedDate);
        } catch (error) {
            return false;
        }
    };

    const mostrarUltimaPesagem = ({ item }: { item: DataItem }) => {
        const ultimaPesagem = item.pesagens[item.pesagens.length - 1];
        const isExpanded = itemsExpandidos.includes(item.id);
        return (
            <View>
                <Row>
                    <Cell>#{item.brinco}</Cell>
                    <Cell>{item.nome}</Cell>
                    <Cell>{item.sexo}</Cell>
                    <Cell>{ultimaPesagem.data}</Cell>
                    <Cell>{ultimaPesagem.peso}kg</Cell>
                    <CrossButton 
                        onPress={() => handleCrossButtonPress(item.id)} 
                        source={isAdding ? require('../../assets/adicionarIcon.png') : require('../../assets/setaIcon.png')} 
                    />
                </Row>
                {isExpanded && item.pesagens.slice(0, -1).map((pesagem, index) => (
                    <Row key={index}>
                        <Cell></Cell>
                        <Cell></Cell>
                        <Cell></Cell>
                        <Cell2>{pesagem.data}</Cell2>
                        <Cell2 style={{ paddingRight: 21 }}>{pesagem.peso}kg</Cell2>
                    </Row>
                ))}
            </View>
        );
    };

    function handleDataNascimentoChange(value: string) {
        let formattedText = value.replace(/[^0-9]/g, '');
        if (formattedText.length > 2) {
          formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
        }
        if (formattedText.length > 5) {
          formattedText = `${formattedText.slice(0, 5)}/${formattedText.slice(5, 9)}`;
        }
        return formattedText;
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
                    <Heading style={{ paddingLeft: 0}}>PESO</Heading>
                    <CrossButton 
                        style={{ opacity: 0 }}
                        source={require('../../assets/setaIcon.png')} 
                    />
                </TableHeader>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={mostrarUltimaPesagem}
                />
               
                <ButtonOption onPress={() => setIsAdding(!isAdding)}>
                    <ButtonOptionText>{isAdding ? 'Cancelar' : 'Cadastrar nova pesagem'}</ButtonOptionText>
                </ButtonOption>
            </ContainerMain>

            <Modal
                visible={modalVisivel}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisivel(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: 280, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <Text>Nova Pesagem</Text>
                        <TextInput 
                            placeholder="00/00/0000"
                            value={novaPesagemData}
                            onChangeText={(value) => setNovaPesagemData(handleDataNascimentoChange(value))}
                            keyboardType="numeric"
                            style={{ borderBottomWidth: 1, marginBottom: 10 }}
                        />
                        <TextInput
                            placeholder="Peso"
                            value={novaPesagemPeso}
                            onChangeText={setNovaPesagemPeso}
                            keyboardType="numeric"
                            style={{ borderBottomWidth: 1, marginBottom: 20 }}
                        />
                        
                        <Button color="#2CB859" title="Adicionar" onPress={adicionarPesagem} />
                        <View style={{ marginTop: 10 }}>
                            <Button color="#2CB859" title="Cancelar" onPress={() => setModalVisivel(false)}  />
                        </View>
                        
                    </View>
                </View>
            </Modal>
        </>
    );
}
