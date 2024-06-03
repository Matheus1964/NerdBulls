import { Header } from '@components/Header'
import logoImg from '@assets/logo.png'
import { ScrollView, Modal, Text, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Container, ContainerTitulo, NameTitulo, ButtonOption, ButtonOptionText, InputField, ErrorMessage, TextLabel, ContainerForm, ContainerItemForm, PickerField, CenteredView, ModalView, TouchableModal } from './styles';
import { Picker } from '@react-native-picker/picker';
import { parse, isValid } from 'date-fns';
import React, { useState } from 'react';

interface MyFormValues {
  brinco: number | string;
  registro: number | string;
  nome: string;
  raca: string;
  dataNascimento: string;
  pesoNascimento: number | string;
  sexo: string;
}

const initialValues: MyFormValues = {
  brinco: '',
  registro: '',
  nome: '',
  raca: '',
  dataNascimento: '',
  pesoNascimento: '',
  sexo: '',
} as MyFormValues;

const validationSchema = Yup.object().shape({
  brinco: Yup.number().required('O número do brinco é obrigatório').positive('O número do brinco deve ser um número positivo'),
  registro: Yup.number().required('O número do registro é obrigatório').positive('O número do registro deve ser um número positivo'),
  nome: Yup.string().required('O nome/apelido do animal é obrigatório'),
  raca: Yup.string().required('A raça do animal é obrigatória'),
  dataNascimento: Yup.string()
    .required('A data de nascimento é obrigatória')
    .test('is-date', 'A data de nascimento deve ser válida', (value: any) => {
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      return isValid(parsedDate);
    }),
  pesoNascimento: Yup.string()
    .matches(/^(\d*(,\d{1,})?|,\d{1,})$/, 'Deve ser um número válido')
    .required('Obrigatório'),
  sexo: Yup.string().required('O sexo do animal é obrigatório')
})

export default function CadastroAnimais() {

  const [modalVisible, setModalVisible] = useState(false);

  //função que vai manipular os dados fo formulario 
  const handleSubmit = (values: any) => {
    console.log(values);
    setModalVisible(true);
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

  function handleNumber(value: string){
    const cleanedText = value.replace(/[^0-9]/g, '');
    return(cleanedText);
  }

  return (
    <>
      <Header LogoSource={logoImg}/>
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
            
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => {
              const handleChangeFormatted = (name: string) => (value: string) => {
                let formattedValue = value;
                if (name === 'dataNascimento') {
                  formattedValue = handleDataNascimentoChange(value);
                } else if(name === 'brinco' || name === 'registro'){
                  formattedValue = handleNumber(value);
                }
                handleChange(name)(formattedValue);
              };

              return (
                <>
                  <ContainerForm>
                    
                    <ContainerItemForm>
                      <TextLabel>Brinco</TextLabel>
                      <InputField
                        placeholder="Insira o número do brinco físico"
                        onChangeText={handleChangeFormatted('brinco')}
                        onBlur={handleBlur('brinco')}
                        value={String(values.brinco)}
                      />
                      {errors.brinco && touched.brinco && <ErrorMessage>{errors.brinco}</ErrorMessage>}
                    </ContainerItemForm>

                    value={values.registro}

                    <ContainerItemForm>
                      <TextLabel>Nome</TextLabel>
                      <InputField
                        placeholder="Insira o nome/Apelido do animal"
                        onChangeText={handleChange('nome')}
                        onBlur={handleBlur('nome')}
                        value={values.nome}
                      />
                      {errors.nome && touched.nome && <ErrorMessage>{errors.nome}</ErrorMessage>}
                    </ContainerItemForm>


                    <ContainerItemForm>
                      <TextLabel>Selecione a raça do animal:</TextLabel>
                      <Picker
                        selectedValue={values.raca}
                        onValueChange={(itemValue: string) => handleChange('raca')(itemValue)}
                      >
                        <Picker.Item label="Escolha uma raça" value='' />
                        <Picker.Item label="Nelore" value="Nelore" />
                        <Picker.Item label="Holândesa preto e branco" value="Holândesa preto e branco" />
                        <Picker.Item label="Holândesa vermelho e branco" value="Holândesa vermelho e branco" />
                        <Picker.Item label="Mini Gado" value="Mini Gado" />
                        <Picker.Item label="Nelore Pintado Vermelho" value="Nelore Pintado Vermelho" />
                        <Picker.Item label="Outro" value="Outro" />
                      </Picker>
                      {errors.raca && touched.raca && <ErrorMessage>{errors.sexo}</ErrorMessage>}
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
                            handleChange('pesoNascimento')(text);
                          }
                        }}
                        onBlur={handleBlur('pesoNascimento')}
                        value={String(values.pesoNascimento)}
                      />
                      {errors.pesoNascimento && touched.pesoNascimento && <ErrorMessage>{errors.pesoNascimento}</ErrorMessage>}
                    </ContainerItemForm>

                    <ContainerItemForm>
                      <TextLabel>Selecione o sexo</TextLabel>
                      <Picker
                        selectedValue={values.sexo}
                        onValueChange={handleChange('sexo')}
                        
                      >
                        <Picker.Item label="Escolha um sexo" value="" />
                        <Picker.Item label="Macho" value="macho" />
                        <Picker.Item label="Fêmea" value="femea" />
                      </Picker>
                        {errors.sexo && touched.sexo && <ErrorMessage>{errors.sexo}</ErrorMessage>}
                    </ContainerItemForm>

                  </ContainerForm>
                  <TouchableOpacity onPress={() => handleSubmit()}>
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
              setModalVisible(!modalVisible);
            }}
          >
            <CenteredView>
              <ModalView >
                <Text>Dados salvos com sucesso!</Text>
                <TouchableModal 
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text>Ok</Text>
                </TouchableModal>
              </ModalView>
            </CenteredView>
        </Modal>

      </Container>
    </>
    
  );
}

