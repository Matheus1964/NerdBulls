import React, { useState, useEffect } from 'react';
import { Header } from '@components/Header';
import logoImg from '@assets/logo.png';
import { ScrollView, Modal, Text, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Container, ContainerTitulo, NameTitulo, ButtonOption, ButtonOptionText,
  InputField, ErrorMessage, TextLabel, ContainerForm, ContainerItemForm,
  CenteredView, ModalView, TouchableModal
} from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import { parse, isValid } from 'date-fns';

// Import Firebase configuration
import { 
  getDatabase, 
  ref, 
  push,
  set,
  onValue
} from 'firebase/database';
import { auth } from '../../services/firebaseConfig'; // Example Firebase configuration

interface MyFormValues {
  brinco: number | string;
  registro: number | string;
  nome: string;
  mae: string;
  pai: string;
  raca: string;
  dataNascimento: string;
  sexo: string;
  metodoDeGestacao: string;
}

const initialValues: MyFormValues = {
  brinco: 0,
  registro: '',
  nome: '',
  raca: '',
  dataNascimento: '',
  sexo: '',
  mae: '',
  pai: '',
  metodoDeGestacao: '',
} as MyFormValues;

interface Animal {
  id: number;
  brinco: string;
  nome: string;
  sexo: string;
  raca: string;
  registro: string;
  dataNascimento: string;
}

const validationSchema = Yup.object().shape({
  registro: Yup.number().required('O número do registro é obrigatório').positive('O número do registro deve ser um número positivo'),
  nome: Yup.string().required('O nome/apelido do animal é obrigatório'),
  dataNascimento: Yup.string()
    .required('A data prevista é obrigatória')
    .test('is-date', 'A data prevista deve ser válida', (value: any) => {
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      return isValid(parsedDate);
    }),
  mae: Yup.string().required('A escolha da mãe é obrigatória'),
  pai: Yup.string().required('A escolha do pai é obrigatória'),
  metodoDeGestacao: Yup.string().required('O método de gestação é obrigatório'),
});

export default function CadastroGestacao() {
  const [modalVisible, setModalVisible] = useState(false);
  const [mães, setMães] = useState<Animal[]>([]);
  const [pais, setPais] = useState<Animal[]>([]);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    // Check current user authentication
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // Return cleanup function for unsubscribe
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const db = getDatabase();
      const animalsRef = ref(db, `users/${currentUser.uid}/animais`);

      const fetchData = () => {
        const listener = onValue(animalsRef, (snapshot) => {
          const animalsData: Animal[] = [];
          snapshot.forEach((childSnapshot) => {
            const animal = childSnapshot.val();
            animalsData.push({
              id: animal.id,
              brinco: animal.brinco,
              nome: animal.nome,
              sexo: animal.sexo,
              raca: animal.raca,
              registro: animal.registro,
              dataNascimento: animal.dataNascimento,
            });
          });

          const mãesFiltered = animalsData.filter((animal) => animal.sexo === 'femea');
          const paisFiltered = animalsData.filter((animal) => animal.sexo === 'macho');

          setMães(mãesFiltered);
          setPais(paisFiltered);
        });

        // Return function to clean up the listener
        return () => {
          off(listener); // Clean up the listener
        };
      };

      fetchData();
    }
  }, [currentUser]);

  const handleSubmit = async (values: MyFormValues) => {
    console.log(values);

    // Save data to Firebase
    if (currentUser) {
      try {
        const db = getDatabase();
        const gestacoesRef = ref(db, `users/${currentUser.uid}/gestantes`);

        // Generate a new record with push
        const newGestacaoRef = push(gestacoesRef);

        // Get the key of the new record
        const newGestacaoKey = newGestacaoRef.key;

        // Define the values to be saved
        const gestacaoData = {
          brinco: values.brinco,
          registro: values.registro,
          nome: values.nome,
          mae: values.mae,
          pai: values.pai,
          raca: values.raca,
          dataNascimento: values.dataNascimento,
          metodoDeGestacao: values.metodoDeGestacao,
        };

        // Save data to the specific path with the key of the new record
        await set(ref(gestacoesRef, newGestacaoKey), gestacaoData);

        setModalVisible(true);
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        // Here you can handle the error, displaying a message to the user
      }
    }
  };

  function handleDataPartoChange(value: string) {
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
      <Container>
        <ScrollView>
          <ContainerTitulo>
            <NameTitulo>Cadastro de Gestação</NameTitulo>
          </ContainerTitulo>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => {
              const handleChangeFormatted = (name: string) => (value: string) => {
                let formattedValue = value;
                if (name === 'dataNascimento') {
                  formattedValue = handleDataPartoChange(value);
                }
                handleChange(name)(formattedValue);
              };

              return (
                <>
                  <ContainerForm>
                    <ContainerItemForm>
                      <TextLabel>Escolha a mãe:</TextLabel>
                      <Dropdown
                        labelField="label"
                        valueField="value"
                        data={[
                          {label: "Selecionar mãe", value: ""},
                          ...mães.map(mãe => ({
                            label: `#${mãe.brinco} ${mãe.nome}`,
                            value: mãe.nome
                          }))
                        ]}
                        value={values.mae}
                        onChange={(itemValue) =>
                          handleChange('mae')(itemValue.value)
                        }
                      />
                      {errors.mae && touched.mae && <ErrorMessage>{errors.mae}</ErrorMessage>} 
                    </ContainerItemForm>

                    <ContainerItemForm>
                      <TextLabel>Escolha o pai:</TextLabel>
                      <Dropdown
                        labelField="label"
                        valueField="value"
                        data={[
                          {label: "Selecionar pai", value: ""},
                          ...pais.map(pai => ({
                            label: `#${pai.brinco} ${pai.nome}`,
                            value: pai.nome
                          }))
                        ]}
                        value={values.pai}
                        onChange={(itemValue) =>
                          handleChange('pai')(itemValue.value)
                        }
                      />
                      {errors.pai && touched.pai && <ErrorMessage>{errors.pai}</ErrorMessage>}
                    </ContainerItemForm>
                    
                    <ContainerItemForm>
                      <TextLabel>Data prevista do parto</TextLabel>
                      <InputField
                        placeholder="DD/MM/AAAA"
                        keyboardType="numeric"
                        value={values.dataNascimento}
                        onChangeText={handleChangeFormatted('dataNascimento')}
                        onBlur={handleBlur('dataNascimento')}
                      />
                      {errors.dataNascimento && touched.dataNascimento && (
                        <ErrorMessage>{errors.dataNascimento}</ErrorMessage>
                      )}
                    </ContainerItemForm>
                
                    <ContainerItemForm>
                      <TextLabel>Método de gestação</TextLabel>
                      <Dropdown
                        labelField="label"
                        valueField="value"
                        data={[
                          { label: "Selecione o método de gestação", value: "" },
                          { label: "Inseminação Artificial", value: "Inseminação Artificial" },
                          { label: "Monta Natural", value: "Monta Natural" },
                          { label: "Transferência de Embriões", value: "Transferência de Embriões" },
                          { label: "FIV/ICSI", value: "FIV/ICSI" },
                          { label: "Outro", value: "Outro" },
                        ]}
                        value={values.metodoDeGestacao}
                        onChange={(itemValue) =>
                          handleChange('metodoDeGestacao')(itemValue.value)
                        }
                      />
                      {errors.metodoDeGestacao && touched.metodoDeGestacao && (
                        <ErrorMessage>{errors.metodoDeGestacao}</ErrorMessage>
                      )}
                    </ContainerItemForm>

                  </ContainerForm>
                  <TouchableOpacity onPress={handleSubmit}>
                    <ButtonOption>
                      <ButtonOptionText>Cadastrar</ButtonOptionText>
                    </ButtonOption>
                  </TouchableOpacity>
                </>
              )
            }}
          </Formik>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
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