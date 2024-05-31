import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native'
import theme from '@theme/index';

export const CardItem = styled.View`
  justify-content: center;
  align-items: center;
  
  width: 160px;
  height: 150px;
  border-radius: 10px;
  background-color: ${theme.COLORS.GRAY_200};

`


export const CardButton = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
 
  
  
  
`
export const Teste = styled.View`
  background-color: #D9D9D9;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 80px;
  
  
  
`
