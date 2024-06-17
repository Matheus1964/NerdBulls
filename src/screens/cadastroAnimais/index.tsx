import React, { useState, useEffect } from 'react'
import { ScrollView, Modal, Text, TouchableOpacity, Alert } from 'react-native'
import { Header } from '@components/Header'
import logoImg from '@assets/logo.png'
import * as Yup from 'yup'
import { Formik } from 'formik'
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
  PickerField,
  CenteredView,
  ModalView,
  TouchableModal
} from './styles'
import { Picker } from '@react-native-picker/picker'
import { parse, isValid } from 'date-fns'
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  child,
  update
} from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { onAuthStateChanged, auth } from '../../services/firebaseConfig'

interface MyFormValues {
  brinco: string
  brincoEletronico: string
  registro: string
  nome: string
  raca: string
  dataNascimento: string
  pesoNascimento: string
  sexo: string
  dataDaPesagem: string[] // Armazenar múltiplas datas de pesagem
  peso: number[] // Armazenar múltiplos pesos
}

const initialValues: MyFormValues = {
  brinco: '',
  brincoEletronico: '',
  registro: '',
  nome: '',
  raca: '',
  dataNascimento: '',
  pesoNascimento: '',
  sexo: '',
  dataDaPesagem: '',
  peso: ''
}

const validationSchema = Yup.object().shape({
  brinco: Yup.string()
    .required('O número do brinco é obrigatório')
    .matches(/^\d+$/, 'O número do brinco deve conter apenas números'),
  brincoEletronico: Yup.string().required('O brinco eletrônico é obrigatório'),
  registro: Yup.string()
    .required('O número do registro é obrigatório')
    .matches(/^\d+$/, 'O número do registro deve conter apenas números'),
  nome: Yup.string().required('O nome/apelido do animal é obrigatório'),
  raca: Yup.string().required('A raça do animal é obrigatória'),
  dataNascimento: Yup.string()
    .required('A data de nascimento é obrigatória')
    .test('is-date', 'A data de nascimento deve ser válida', (value: any) => {
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date())
      return isValid(parsedDate)
    }),
  pesoNascimento: Yup.string()
    .matches(
      /^\d+(\.\d{1,2})?$/,
      'O peso de nascimento deve ser um número válido'
    )
    .required('O peso de nascimento é obrigatório'),
  sexo: Yup.string().required('O sexo do animal é obrigatório')
})

export default function CadastroAnimais() {
  const [modalVisible, setModalVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const [nextId, setNextId] = useState<number | null>(null)
  const database = getDatabase()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      if (user) {
        fetchNextId(user.uid)
      }
    })
    return () => unsubscribe()
  }, [])

  const fetchNextId = async (uid: string) => {
    const dbRef = ref(database, `users/${uid}`)
    const lastIdSnapshot = await get(child(dbRef, 'lastId'))
    if (lastIdSnapshot.exists()) {
      setNextId(lastIdSnapshot.val() + 1)
    } else {
      setNextId(1)
    }
  }

  const handleSubmit = async (values: MyFormValues) => {
    try {
      if (!currentUser || nextId === null) {
        throw new Error('Nenhum usuário autenticado ou ID não carregado')
      }

      // Garante que os arrays estão inicializados como vazios caso não sejam preenchidos no formulário
      values.dataDaPesagem = values.dataDaPesagem || []
      values.peso = values.peso || []

      await writeUserData(
        currentUser.uid,
        nextId,
        values.brinco,
        values.brincoEletronico,
        values.registro,
        values.nome,
        values.raca,
        values.dataNascimento,
        values.pesoNascimento,
        values.sexo,
        values.dataDaPesagem,
        values.peso
      )

      setNextId(nextId + 1)
      setModalVisible(true)
    } catch (error) {
      console.error('Erro ao salvar os dados:', error)
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao salvar os dados. Por favor, tente novamente.'
      )
    }
  }

  async function writeUserData(
    uid: string,
    animalId: number,
    brinco: string,
    brincoEletronico: string,
    registro: string,
    nome: string,
    raca: string,
    dataNascimento: string,
    pesoNascimento: string,
    sexo: string,
    dataDaPesagem: string,
    peso: number
  ) {
    const dbRef = ref(database, `users/${uid}/animais`)
    const newAnimalRef = push(dbRef) // Criando uma nova referência para o animal
    try {
      await set(newAnimalRef, {
        id: animalId, // Adicionar o ID gerado ao animal
        brinco,
        brincoEletronico,
        registro,
        nome,
        raca,
        dataNascimento,
        pesoNascimento,
        sexo,
        dataDaPesagem,
        peso
      })
      await update(ref(database, `users/${uid}`), { lastId: animalId })
    } catch (error) {
      throw error
    }
  }

  function handleDataNascimentoChange(value: string) {
    let formattedText = value.replace(/[^0-9]/g, '')
    if (formattedText.length > 2) {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`
    }
    if (formattedText.length > 5) {
      formattedText = `${formattedText.slice(0, 5)}/${formattedText.slice(
        5,
        9
      )}`
    }
    return formattedText
  }

  return (
    <>
      <Header LogoSource={logoImg} />
      <Container>
        <ScrollView>
          <ContainerTitulo>
            <NameTitulo>Cadastro de Animais</NameTitulo>
          </ContainerTitulo>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched
            }) => {
              const handleChangeFormatted =
                (name: string) => (value: string) => {
                  let formattedValue = value
                  if (name === 'dataNascimento') {
                    formattedValue = handleDataNascimentoChange(value)
                  } else if (name === 'brinco' || name === 'registro') {
                    formattedValue = value.replace(/\D/g, '') // Apenas dígitos
                  }
                  handleChange(name)(formattedValue)
                }

              return (
                <>
                  <ContainerForm>
                    <ContainerItemForm>
                      <TextLabel>Brinco</TextLabel>
                      <InputField
                        placeholder="Insira o número do brinco físico"
                        onChangeText={handleChangeFormatted('brinco')}
                        onBlur={handleBlur('brinco')}
                        value={values.brinco}
                      />
                      {errors.brinco && touched.brinco && (
                        <ErrorMessage>{errors.brinco}</ErrorMessage>
                      )}
                    </ContainerItemForm>

                    <ContainerItemForm>
                      <TextLabel>Brinco Eletrônico</TextLabel>
                      <InputField
                        placeholder="Insira o número do brinco eletrônico"
                        onChangeText={handleChange('brincoEletronico')}
                        onBlur={handleBlur('brincoEletronico')}
                        value={values.brincoEletronico}
                      />
                      {errors.brincoEletronico && touched.brincoEletronico && (
                        <ErrorMessage>{errors.brincoEletronico}</ErrorMessage>
                      )}
                    </ContainerItemForm>

                    <ContainerItemForm>
                      <TextLabel>Registro</TextLabel>
                      <InputField
                        placeholder="Insira o número do registro"
                        onChangeText={handleChangeFormatted('registro')}
                        onBlur={handleBlur('registro')}
                        value={values.registro}
                      />
                      {errors.registro && touched.registro && (
                        <ErrorMessage>{errors.registro}</ErrorMessage>
                      )}
                    </ContainerItemForm>

                    <ContainerItemForm>
                      <TextLabel>Nome</TextLabel>
                      <InputField
                        placeholder="Insira o nome/Apelido do animal"
                        onChangeText={handleChange('nome')}
                        onBlur={handleBlur('nome')}
                        value={values.nome}
                      />
                      {errors.nome && touched.nome && (
                        <ErrorMessage>{errors.nome}</ErrorMessage>
                      )}
                    </ContainerItemForm>
                    <ContainerItemForm>
                      <TextLabel>Selecione a raça do animal:</TextLabel>
                      <Picker
                        selectedValue={values.raca}
                        onValueChange={(itemValue: string) =>
                          handleChange('raca')(itemValue)
                        }
                      >
                        <Picker.Item label="Escolha uma raça" value="" />
                        <Picker.Item label="Nelore" value="Nelore" />
                        <Picker.Item
                          label="Holandesa preto e branco"
                          value="Holandesa preto e branco"
                        />
                        <Picker.Item
                          label="Holandesa vermelho e branco"
                          value="Holandesa vermelho e branco"
                        />
                        <Picker.Item label="Mini Gado" value="Mini Gado" />
                        <Picker.Item
                          label="Nelore Pintado Vermelho"
                          value="Nelore Pintado Vermelho"
                        />
                        <Picker.Item label="Outro" value="Outro" />
                      </Picker>
                      {errors.raca && touched.raca && (
                        <ErrorMessage>{errors.raca}</ErrorMessage>
                      )}
                    </ContainerItemForm>

                    <ContainerItemForm>
                      <TextLabel>Data de Nascimento</TextLabel>
                      <InputField
                        placeholder="DD/MM/AAAA"
                        value={values.dataNascimento}
                        onChangeText={handleChangeFormatted('dataNascimento')}
                        onBlur={handleBlur('dataNascimento')}
                      />
                      {errors.dataNascimento && touched.dataNascimento && (
                        <ErrorMessage>{errors.dataNascimento}</ErrorMessage>
                      )}
                    </ContainerItemForm>

                    <ContainerItemForm>
                      <TextLabel>Peso ao nascer</TextLabel>
                      <InputField
                        placeholder="Ex. 50"
                        onChangeText={(text: any) => {
                          // Permitir apenas números e vírgulas
                          if (/^[0-9,]*$/.test(text)) {
                            handleChange('pesoNascimento')(text)
                          }
                        }}
                        onBlur={handleBlur('pesoNascimento')}
                        value={values.pesoNascimento}
                      />
                      {errors.pesoNascimento && touched.pesoNascimento && (
                        <ErrorMessage>{errors.pesoNascimento}</ErrorMessage>
                      )}
                    </ContainerItemForm>

                    <ContainerItemForm>
                      <TextLabel>Selecione o sexo</TextLabel>
                      <Picker
                        selectedValue={values.sexo}
                        onValueChange={(itemValue: string) =>
                          handleChange('sexo')(itemValue)
                        }
                      >
                        <Picker.Item label="Escolha um sexo" value="" />
                        <Picker.Item label="Macho" value="macho" />
                        <Picker.Item label="Fêmea" value="femea" />
                      </Picker>
                      {errors.sexo && touched.sexo && (
                        <ErrorMessage>{errors.sexo}</ErrorMessage>
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
  )
}
