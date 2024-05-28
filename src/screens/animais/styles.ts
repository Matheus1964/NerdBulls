import styled from 'styled-components/native';
import theme from '@theme/index';

export const Container =  styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.COLORS.WHITE};
`;

export const Title = styled.Text`
  color: black;
  font-size: ${theme.FONT_SIZE.XL};
  font-family: ${theme.FONT_FAMILY.BOLD};
  text-align: left;
`;

export const ContainerTitulo = styled.View`
  color: blue;
  margin-bottom: 30px;
  margin-top: 20px;
  margin-left: 40px;
  align-items: flex-start;
  padding-inline: 20px;
  justify-content: flex-start;
  width: 100%;
`;

export const ListContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const AnimalItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.COLORS.GRAY_300};
  border-width: ${(props: any) => (props.selected ? '2px' : '0px')};
  border-color: ${(props: any) => (props.selected ? `${theme.COLORS.GREEN_500}` : 'transparent')};
`;

export const AnimalText = styled.Text`
  flex: 1;
  text-align: center;
  padding-left: 10px;
`;

export const CheckBoxWrapper = styled.View`
  flex: 1;
  margin: 5px;
  background-color: white;
  border-radius: 5px;
  align-items: center;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #f0f0f0;
  padding: 10px;
  align-items: center;
`;

export const HeaderText = styled.Text`
  flex: 1;
  font-size: 14px;
  padding-left: 10px;
  text-align: center;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-inline: 20px;
  padding-bottom: 20px;
  width: 100%;
`;

export const SelectButton = styled.TouchableOpacity`
  background-color: ${theme.COLORS.GREEN_500};
  padding: 15px;
  border-radius: 5px;
  align-items: center;
  margin-top: 20px;
  min-width: 80%;
  max-width: 500px;
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: ${theme.FONT_SIZE.MD};
`;
