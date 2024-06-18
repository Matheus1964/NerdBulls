import React, { useState, useEffect } from 'react';
import { ScrollView, Modal, Text, TouchableOpacity, Alert } from 'react-native';
import { Header } from '@components/Header';
import logoImg from '@assets/logo.png';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Container,
  ContainerTitulo,
  NameTitulo,
  ButtonOption,
  ButtonOptionText,
  InputField,
  ErrorMessage,
  TextLabel,
  ContainerForm,
  ContainerItemForm,
  CenteredView,
  ModalView,
  TouchableModal
} from './styles';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, push, set, get, child, update } from 'firebase/database';
import { onAuthStateChanged, auth } from '../../services/firebaseConfig';

interface Animal {
  key: string;
  nome: string;
  vacinas?: Vacina[];
}

interface Vacina {
  id: string;
  qtAdministrada: string;
  viaDeAdministracao: string;
  nomeVacina: string;
}

interface MyFormValues {
  qtAdministrada: string;
  nomeDoAnimal: string;
  viaDeAdministracao: string;
  vacina: string;
}

const initialValues: MyFormValues = {
  qtAdministrada: '',
  nomeDoAnimal: '',
  viaDeAdministracao: '',
  vacina: ''
};

const validationSchema = Yup.object().shape({
  qtAdministrada: Yup.string().required('Quantidade administrada é obrigatória'),
  nomeDoAnimal: Yup.string().required('Animal é obrigatório'),
  viaDeAdministracao: Yup.string().required('Via de administração é obrigatória'),
  vacina: Yup.string().required('Vacina é obrigatória'),
});

export default function CadastroVacina() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [nextId, setNextId] = useState<number | null>(null);
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  const database = getDatabase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      if (user) {
        fetchNextId(user.uid);
        fetchAnimais(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchNextId = async (uid: string) => {
    const dbRef = ref(database, `users/${uid}`);
    const lastIdSnapshot = await get(child(dbRef, 'lastId'));
    if (lastIdSnapshot.exists()) {
      setNextId(lastIdSnapshot.val() + 1);
    } else {
      setNextId(1);
    }
  };

  const fetchAnimais = async (uid: string) => {
    const dbRef = ref(database, `users/${uid}/animais`);
    const animaisSnapshot = await get(dbRef);
    if (animaisSnapshot.exists()) {
      const animaisData = animaisSnapshot.val();
      const animaisList = Object.keys(animaisData).map(key => ({
        key: key,
        ...animaisData[key]
      })) as Animal[];
      setAnimais(animaisList);
    }
  };

  const handleSubmit = async (values: MyFormValues) => {
    try {
      if (!currentUser) {
        throw new Error('Nenhum usuário autenticado');
      }

      // Encontrar o ID do animal com base no nome selecionado
      const selectedAnimal = animais.find(animal => animal.nome === values.nomeDoAnimal);
      if (!selectedAnimal) {
        throw new Error('Animal não encontrado');
      }

      console.log(values)

      const vacinaData = {
        qtAdministrada: values.qtAdministrada,
        viaDeAdministracao: values.viaDeAdministracao,
        nomeVacina: values.vacina,
      };

      await addVacinaToAnimal(currentUser.uid, selectedAnimal.key, vacinaData);

      setModalVisible(true);
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao salvar os dados. Por favor, tente novamente.'
      );
    }
  };

  async function addVacinaToAnimal(
    uid: string,
    animalKey: string,
    vacinaData: { qtAdministrada: string; viaDeAdministracao: string; nomeVacina: string }
  ) {
    const dbRef = ref(database, `users/${uid}/animais/${animalKey}/vacinas`);
    try {
      const newVacinaRef = push(dbRef);
      const vacinaId = newVacinaRef.key;

      await set(newVacinaRef, {
        id: vacinaId,
        ...vacinaData,
      });

      console.log('Vacina adicionada com sucesso:', vacinaData);
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <Header LogoSource={logoImg} />
      <Container>
        <ScrollView>
          <ContainerTitulo>
            <NameTitulo>Registre uma vacina</NameTitulo>
          </ContainerTitulo>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <>
                <ContainerForm>
                  <ContainerItemForm>
                    <TextLabel>Animal</TextLabel>
                    <Picker
                      selectedValue={values.nomeDoAnimal}
                      onValueChange={(itemValue) => {
                        setFieldValue('nomeDoAnimal', itemValue);
                      }}
                    >
                      <Picker.Item label="Selecione um animal" value="" />
                      {animais.map(animal => (
                        <Picker.Item key={animal.key} label={animal.nome} value={animal.nome} />
                      ))}
                    </Picker>
                    {errors.nomeDoAnimal && touched.nomeDoAnimal && (
                      <ErrorMessage>{errors.nomeDoAnimal}</ErrorMessage>
                    )}
                  </ContainerItemForm>

                  <ContainerItemForm>
                    <TextLabel>Quantidade administrada</TextLabel>
                    <InputField
                      placeholder="Ex 500mg"
                      onChangeText={handleChange('qtAdministrada')}
                      onBlur={handleBlur('qtAdministrada')}
                      value={values.qtAdministrada}
                    />
                    {errors.qtAdministrada && touched.qtAdministrada && (
                      <ErrorMessage>{errors.qtAdministrada}</ErrorMessage>
                    )}
                  </ContainerItemForm>

                  <ContainerItemForm>
                    <TextLabel>Nome da vacina</TextLabel>
                    <Picker
                      selectedValue={values.vacina}
                      onValueChange={(itemValue) => setFieldValue('vacina', itemValue)}
                    >
                      <Picker.Item label="Nome da vacina" value="" />
                      <Picker.Item label="Febre Aftosa" value="Febre Aftosa" />
                      <Picker.Item label="Brucelose" value="Brucelose" />
                      <Picker.Item label="Raiva" value="Raiva" />
                      <Picker.Item label="Clostridiose" value="Clostridiose" />
                      <Picker.Item label="Leptospirose" value="Leptospirose" />
                      <Picker.Item label="Anaplasmose" value="Anaplasmose" />
                    </Picker>
                    {errors.vacina && touched.vacina && (
                      <ErrorMessage>{errors.vacina}</ErrorMessage>
                    )}
                  </ContainerItemForm>

                  <ContainerItemForm>
                    <TextLabel>Via de administração</TextLabel>
                    <Picker
                      selectedValue={values.viaDeAdministracao}
                      onValueChange={(itemValue) => setFieldValue('viaDeAdministracao', itemValue)}
                    >
                      <Picker.Item label="Selecione a via" value="" />
                      <Picker.Item label="Via Oral" value="Via Oral" />
                      <Picker.Item label="Via Intramuscular" value="Via Intramuscular" />
                      <Picker.Item label="Via Subcutânea" value="Via Subcutânea" />
                      <Picker.Item label="Via Intravenosa" value="Via Intravenosa" />
                    </Picker>
                    {errors.viaDeAdministracao && touched.viaDeAdministracao && (
                      <ErrorMessage>{errors.viaDeAdministracao}</ErrorMessage>
                    )}
                  </ContainerItemForm>
                </ContainerForm>

                <TouchableOpacity onPress={handleSubmit}>
                  <ButtonOption>
                    <ButtonOptionText>Cadastrar</ButtonOptionText>
                  </ButtonOption>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <CenteredView>
            <ModalView>
              <Text>Dados salvos com sucesso!</Text>
              <TouchableModal onPress={() => setModalVisible(false)}>
                <Text>Ok</Text>
              </TouchableModal>
            </ModalView>
          </CenteredView>
        </Modal>
      </Container>
    </>
  );
}
