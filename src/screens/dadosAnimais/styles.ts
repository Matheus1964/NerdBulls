import styled from 'styled-components/native';
import theme from '@theme/index';

export const Container =  styled.View`
  justify-content: center;
  margin-left: 10px;
  
  
`;

export const Label = styled.Text`
  margin-bottom: 10px;
  color: black;
  font-size: ${theme.FONT_SIZE.MD};
  font-family: ${theme.FONT_FAMILY.BOLD};
  text-align: left;
`;
export const InfoAnimal = styled.Text`
  margin-bottom: 15px;
  color: black;
  font-size: ${theme.FONT_SIZE.SM};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  text-align: left;
`;

