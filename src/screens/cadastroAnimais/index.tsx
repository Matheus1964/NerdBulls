import { Header } from '@components/Header'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { Container, ContainerTitulo, NameTitulo, ButtonOption, ButtonOptionText, InputField, ErrorMessage, TextLabel, ContainerForm, ContainerItemForm, PickerField } from './styles';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
//import { parse, isValid } from 'date-fns';

interface MyFormValues {
  brinco: number | null;
  registro: number | null;
  nome: string;
  raca: string;
  dataNascimento: string;
  pesoNascimento: number | null;
  sexo: string;
}

const initialValues: MyFormValues = {
  brinco: null,
  registro: null,
  nome: '',
  raca: '',
  dataNascimento: '',
  pesoNascimento: null,
  sexo: '',
} as MyFormValues;

const validationSchema = Yup.object().shape({
  brinco: Yup.number().required('O número do brinco é obrigatório').positive('O número do brinco deve ser um número positivo'),
  registro: Yup.number().required('O número do registro é obrigatório').positive('O número do registro deve ser um número positivo'),
  nome: Yup.string().required('O nome/apelido do animal é obrigatório'),
  raca: Yup.string().required('A raça do animal é obrigatória'),
  dataNascimento: Yup.string()
    .required('A data de nascimento é obrigatória')
    .test('isValidDate', 'A data de nascimento não é válida', (value) => {
      if (!value) return false;
      const dateParts = value.split("/");
      const date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      return !isNaN(date.getTime());
  }),
  pesoNascimento: Yup.number().required('O peso é obrigatório').positive('O valor ao nascer deve ser um número positivo'),
  sexo: Yup.string().required('O sexo do animal é obrigatório')
})



export default function CadastroAnimais() {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const [dataNascimento, setDataNascimento] = useState('');

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

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
      <Header />
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
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => (

              <>
                <ContainerForm>
                  
                  <ContainerItemForm>
                    <TextLabel>Brinco</TextLabel>
                    <InputField
                      placeholder="Informe o número do brinco do animal"
                      onChangeText={handleChange('brinco')}
                      onBlur={handleBlur('brinco')}
                      value={values.brinco}
                    />
                    {errors.brinco && touched.brinco && <ErrorMessage>{errors.brinco}</ErrorMessage>}
                  </ContainerItemForm>

                  <ContainerItemForm>
                    <TextLabel>Número do registro</TextLabel>
                    <InputField
                      placeholder="Informe o número do registro do animal"
                      onChangeText={handleChange('registro')}
                      onBlur={handleBlur('registro')}
                      value={values.registro}
                    />
                    {errors.registro && touched.registro && <ErrorMessage>{errors.registro}</ErrorMessage>}
                  </ContainerItemForm>

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
                    <PickerField
                      selectedValue={values.raca}
                      onValueChange={handleChange('raca')}
                    >
                      <Picker.Item label="Escolha uma raça" value='' />
                      <Picker.Item label="Nelore" value="Nelore" />
                      <Picker.Item label="Holândesa preto e branco" value="Holândesa preto e branco" />
                      <Picker.Item label="Holândesa vermelho e branco" value="Holândesa vermelho e branco" />
                      <Picker.Item label="Mini Gado" value="Mini Gado" />
                      <Picker.Item label="Nelore Pintado Vermelho" value="Nelore Pintado Vermelho" />
                      <Picker.Item label="Outro" value="Outro" />
                    </PickerField>
                      {errors.raca && touched.sexo && <ErrorMessage>{errors.sexo}</ErrorMessage>}
                  </ContainerItemForm>
                  
                  <ContainerItemForm>
                    <TextLabel>Data de Nascimento</TextLabel>
                    <InputField
                      placeholder="DD/MM/AAAA"
                      value={handleDataNascimentoChange(values.dataNascimento)}
                      onChangeText={handleChange('dataNascimento')}
                      onBlur={handleBlur('dataNascimento')}
                    />
                    {formik.touched.dataNascimento && formik.errors.dataNascimento && (
                      <ErrorMessage>{formik.errors.dataNascimento}</ErrorMessage>
                    )}
                  </ContainerItemForm>
                  
                  <ContainerItemForm>
                    <TextLabel>Peso ao nascer</TextLabel>
                    <InputField
                      placeholder="Ex. 50"
                      onChangeText={handleChange('pesoNascimento')}
                      onBlur={handleBlur('pesoNascimento')}
                      value={values.pesoNascimento}
                    />
                    {errors.pesoNascimento && touched.pesoNascimento && <ErrorMessage>{errors.pesoNascimento}</ErrorMessage>}
                  </ContainerItemForm>

                  <ContainerItemForm>
                    <TextLabel>Selecione o sexo:</TextLabel>
                    <PickerField
                      selectedValue={values.sexo}
                      onValueChange={handleChange('sexo')}
                      
                    >
                      <Picker.Item label="Escolha um sexo" value="" />
                      <Picker.Item label="Macho" value="macho" />
                      <Picker.Item label="Fêmea" value="femea" />
                    </PickerField>
                      {errors.sexo && touched.sexo && <ErrorMessage>{errors.sexo}</ErrorMessage>}
                  </ContainerItemForm>

                </ContainerForm>
                <TouchableOpacity onPress={() => formik.handleSubmit()}>
                  <ButtonOption>
                    <ButtonOptionText>Cadastrar</ButtonOptionText>
                  </ButtonOption>
                </TouchableOpacity>
              </>
          )}
          </Formik>
        </ScrollView>
        
      </Container>
    </>
    
  );
}

