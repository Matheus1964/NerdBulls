import styled from 'styled-components/native';
import theme from '@theme/index';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.WHITE};
`;

export const Label = styled.Text`
  margin-bottom: 5px;
  color: ${theme.COLORS.BLACK};
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
`;

export const InfoAnimal = styled.Text`
  margin-bottom: 10px;
  color: ${theme.COLORS.BLACK};
  font-size: ${theme.FONT_SIZE.SM}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const Title_pg = styled.Text`
  margin: 20px 0;
  margin-left: 20px;
  color: ${theme.COLORS.BLACK};
  font-size: ${theme.FONT_SIZE.XL}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
`;
