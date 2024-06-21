import React, { useState } from 'react';
import { Header } from '@components/Header';
import logoImg from '@assets/logo.png';
import { ScrollView, Modal, Text, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { 
  Container, ContainerTitulo, NameTitulo, ButtonOption, ButtonOptionText, 
  InputField, ErrorMessage, TextLabel, ContainerForm, ContainerItemForm, 
  PickerField, CenteredView, ModalView, TouchableModal 
} from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import { parse, isValid } from 'date-fns';

interface MyFormValues {
  brinco: number | string;
  registro: number | string;
  nome: string;
  mae: string;
  pai: string;
  raca: string;
  dataNascimento: string;
  pesoNascimento: number | string;
  sexo: string;
}

const initialValues: MyFormValues = {
  brinco: 0,
  registro: '',
  nome: '',
  raca: '',
  dataNascimento: '',
  pesoNascimento: '',
  sexo: '',
  mae: '',
  pai: '',
} as MyFormValues;

// Interface JSON
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

interface Vacina {
  nome: string;
  data: string;
}

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
      nome: "Tobias", 
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
      nome: "Brutus", 
      sexo: "M", 
      pesagens: [
          {"data": "22/03/2023", "peso": 210},
          {"data": "23/03/2023", "peso": 208},
          {"data": "24/03/2023", "peso": 211},
          {"data": "25/03/2023", "peso": 209}
      ]
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
  },
  { 
      id: 6, 
      brinco: "006", 
      nome: "Max", 
      sexo: "M", 
      pesagens: [
          {"data": "12/02/2024", "peso": 310},
          {"data": "13/02/2024", "peso": 312},
          {"data": "14/02/2024", "peso": 311},
          {"data": "15/02/2024", "peso": 313}
      ]
  },
  { 
      id: 7, 
      brinco: "007", 
      nome: "Rocky", 
      sexo: "M", 
      pesagens: [
          {"data": "05/04/2024", "peso": 270},
          {"data": "06/04/2024", "peso": 272},
          {"data": "07/04/2024", "peso": 271},
          {"data": "08/04/2024", "peso": 273}
      ]
  },
  { 
      id: 8, 
      brinco: "008", 
      nome: "Rex", 
      sexo: "M", 
      pesagens: [
          {"data": "19/05/2024", "peso": 350},
          {"data": "20/05/2024", "peso": 352},
          {"data": "21/05/2024", "peso": 351},
          {"data": "22/05/2024", "peso": 353}
      ]
  }
];



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
});

export default function CadastroGestacao() {

  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (values: any) => {
    console.log(values);
    setModalVisible(true);
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

  function handleNumber(value: string){
    const cleanedText = value.replace(/[^0-9]/g, '');
    return(cleanedText);
  }

  const mães = data.filter(animal => animal.sexo === 'F');
  const pais = data.filter(animal => animal.sexo === 'M');

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
                } else if (name === 'brinco' || name === 'registro') {
                  formattedValue = handleNumber(value);
                }
                handleChange(name)(formattedValue);
              };

              const handlePickerChange = (name: string) => (itemValue: any, itemIndex: number) => {
                handleChange(name)(itemValue.toString());
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
                            label:`#${mãe.brinco} ${mãe.nome}`, value: mãe.nome
                          }))
                        ]}
                        value={values.mae}
                        onChange={(itemValue) =>
                          {
                            console.log(itemValue)
                            return handleChange('mae')(itemValue.value)
                          }
                        }
                      >
                      </Dropdown>
                      {/* <PickerField
                        selectedValue={values.mae}
                        onValueChange={handlePickerChange('mae')}
                      >
                        <Picker.Item label="Selecionar mãe" value='' />
                        {mães.map(mãe => (
                          <Picker.Item key={mãe.id} label={`#${mãe.brinco} ${mãe.nome}`} value={mãe.nome} />
                        ))}
                      </PickerField>*/}
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
                            label:`#${pai.brinco} ${pai.nome}`, value: pai.nome
                          }))
                        ]}
                        value={values.pai}
                        onChange={(itemValue) =>
                          {
                            console.log(itemValue)
                            return handleChange('pai')(itemValue.value)
                          }
                        }
                      >
                      </Dropdown>
                      {/* <PickerField
                        selectedValue={values.pai}
                        onValueChange={handlePickerChange('pai')}
                      >
                        <Picker.Item label="Selecionar pai" value='' />
                        {pais.map(pai => (
                          <Picker.Item key={pai.id} label={`#${pai.brinco} ${pai.nome}`} value={pai.nome} />
                        ))}
                      </PickerField> */}
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
