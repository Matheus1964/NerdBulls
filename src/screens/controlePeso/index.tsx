import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, Modal, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
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
import { getDatabase, ref, get, update, set } from 'firebase/database';
import { auth } from '../../services/firebaseConfig'; // Importe o auth do firebaseConfig

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
        id: key, // Utilizando a chave do objeto como ID
        brinco: animalsData[key].brinco,
        nome: animalsData[key].nome,
        sexo: animalsData[key].sexo,
        pesagens: animalsData[key].pesagens ? Object.values(animalsData[key].pesagens) : []
        // Incluir outros campos conforme necessário, como brincoEletronico, dataNascimento, etc.
      }));
      setData(animalsList);
    } else {
      console.log("No data available");
    }
    setLoading(false);
  };
  

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

  const adicionarPesagem = async () => {
    if (idAnimalSelecionado !== null && novaPesagemData.trim() !== '' && !isNaN(parseFloat(novaPesagemPeso))) {
      const isValidDate = validateDate(novaPesagemData);
      if (isValidDate) {
        const newPesagem = { data: novaPesagemData, peso: parseFloat(novaPesagemPeso) };
        const updatedData = data.map(item => {
          if (item.id === idAnimalSelecionado) {
            return {
              ...item,
              pesagens: [...item.pesagens, newPesagem]
            };
          }
          return item;
        });
        setData(updatedData);

        const currentUser = auth.currentUser;
        if (currentUser) {
          const dbRef = ref(getDatabase(), `users/${currentUser.uid}/animais/${idAnimalSelecionado}`);
          await update(dbRef, {
            pesagens: [...updatedData.find(item => item.id === idAnimalSelecionado)?.pesagens ?? [], newPesagem]
          });
        }

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

  const excluirPesagem = async (animalId: number, pesagemIndex: number) => {
    const updatedData = data.map(item => {
      if (item.id === animalId) {
        const updatedPesagens = item.pesagens.filter((_, index) => index !== pesagemIndex);
        return {
          ...item,
          pesagens: updatedPesagens
        };
      }
      return item;
    });
    setData(updatedData);

    const currentUser = auth.currentUser;
    if (currentUser) {
      const dbRef = ref(getDatabase(), `users/${currentUser.uid}/animais/${animalId}/pesagens`);
      await set(dbRef, updatedData.find(item => item.id === animalId)?.pesagens);
    }
  };

  const mostrarUltimaPesagem = ({ item }: { item: DataItem }) => {
    const ultimaPesagem = item.pesagens && item.pesagens.length > 0 ? item.pesagens[item.pesagens.length - 1] : null;
    const isExpanded = itemsExpandidos.includes(item.id);
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
            onPress={() => handleCrossButtonPress(item.id)} 
            source={isAdding ? require('../../assets/adicionarIcon.png') : require('../../assets/setaIcon.png')} 
          />
        </Row>
        {isExpanded && item.pesagens.map((pesagem, index) => (
          <Row key={index}>
            <Cell></Cell>
            <Cell></Cell>
            <Cell></Cell>
            <Cell2>{pesagem.data}</Cell2>
            <Cell2 style={{ paddingRight: 21 }}>{pesagem.peso}kg</Cell2>
            <TouchableOpacity onPress={() => excluirPesagem(item.id, index)}>
              <Text style={{ color: 'red' }}>Excluir</Text>
            </TouchableOpacity>
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
