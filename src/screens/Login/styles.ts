import { Image } from "expo-image";
import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const MainImg = styled(Image)`
  width: 355px;
  height: 337px;
  margin-bottom: 83px;
`;

export const ContainerTitulo= styled.View`
  color: blue;
`;

export const NameTitulo= styled.Text`
  color: #2E3E4B;
  font-size: 30px;
  margin-bottom: 30px;
`;

export const NameSubTitulo= styled.Text`
  color: #2E3E4B;
  font-size: 16px;
  display: flex;
  padding-left: 25px;
  margin-bottom: 40px;
`;

export const ButtonGmail= styled.TouchableOpacity`
  background-color: #2CB859;
  border-radius: 5px;
  width: 390px;
  height: 56px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

export const ImgGoogle = styled(Image)`
  margin-right: 300px;
  width: 40px;
  height: 40px;
`;

export const ButtonGoogle = styled.Text`
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 16px;
  color: #FFFFFF;
  position: absolute;
`;

export const ButtonOption = styled.TouchableOpacity`
  background-color: white;
  border-radius: 5px;
  width: 390px;
  height: 56px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: black;
`;

export const ButtonOptionText = styled.Text`
  color: black;
  font-size: 16px;
`;
