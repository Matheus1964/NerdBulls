import React, { useState } from 'react';
import { Header } from '@components/Header';
import { FlatList } from 'react-native';
import { 
  Container, ContainerTitulo, NameTitulo,
  ButtonOption, ButtonOptionText, InputField,
  ErrorMessage, TextLabel, ContainerForm, ContainerItemForm, 
  PickerField, CenteredView, ModalView, TouchableModal,
  ContainerMain, HeaderTopBar, TableHeader, HeaderTopBarText, Heading, Row, Cell
} from './styles';

import CrossButton from '../../components/CrossButton/'


interface DataItem {
    id: number; 
    brinco: string; 
    nome: string;
    sexo: string; 
    data: string; 
    peso: string; 
  }
  
  export default function ControlePeso() {
      const data: DataItem[] = [
          { id: 1, brinco: "001", nome: "Belinha", sexo: "F", data: "26/10/2023", peso: "380kg" },
          { id: 2, brinco: "002", nome: "Gigi", sexo: "F", data: "28/02/2024", peso: "490kg" },
          { id: 3, brinco: "003", nome: "Julinha", sexo: "M", data: "06/12/2023", peso: "190kg" },
          { id: 4, brinco: "004", nome: "Julinha", sexo: "M", data: "22/03/2023", peso: "210kg" },
      ];
  
    const renderItem = ({ item }: { item: DataItem }) => (
      <Row>
        <Cell>#{item.brinco}</Cell>
        <Cell>{item.nome}</Cell>
        <Cell>{item.sexo}</Cell>
        <Cell>{item.data}</Cell>
        <Cell>{item.peso}</Cell>
        <CrossButton source={require('../../assets/crossButtonpng.png')} />
      </Row>
    );

  return (
    <>
      <Header />
    
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
            renderItem={renderItem}
          />

        <ButtonOption>
            <ButtonOptionText>Cadastrar nova pesagem</ButtonOptionText>
        </ButtonOption>
        </ContainerMain>
     
    </>
  );
}
