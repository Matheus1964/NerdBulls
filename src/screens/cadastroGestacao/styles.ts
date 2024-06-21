import styled from 'styled-components/native';
import theme from '@theme/index';
import { Dropdown } from 'react-native-element-dropdown';

export const Container = styled.View`
  padding-inline: 20px;
  flex: 1;
  background-color: ${theme.COLORS.WHITE};
`;

export const ContainerTitulo= styled.View`
  color: blue;
  margin-bottom: 30px;
  margin-top: 20px;
  align-items: flex-start;
  padding: 20px;
`;

export const ContainerForm = styled.View`
  align-items: flex-start;
  display: block;
  padding-left: 20px;
`;

export const ContainerItemForm = styled.View`
  margin-bottom: 30px;
  width: 90%;
`;

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: ${theme.COLORS.WHITE};
  border-radius: 20px;
  padding: 35px;
  align-items: center;
`;

export const TouchableModal = styled.TouchableOpacity`
  background-color: #2CB859;
  border-radius: 3px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
`;

export const NameTitulo= styled.Text`
  color: black;
  font-size: ${theme.FONT_SIZE.XL};
  font-family: ${theme.FONT_FAMILY.BOLD};
  text-align: left;
`;

export const TextLabel = styled.Text`
  color: ${theme.COLORS.GRAY_400};
  font-size: ${theme.FONT_SIZE.MD};
  margin-bottom: 5px;
  text-align: left;
  padding-right: 10px;
  width: 100%;
`;

export const InputField = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 5px;
  width: 100%;
  min-width: 300px;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  color: ${theme.COLORS.GRAY_300};
  opacity: 0.5;
`;

export const ErrorMessage = styled.Text`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const ButtonOption = styled.TouchableOpacity`
  background-color: #2CB859;
  margin: 0;
  border-radius: 5px;
  width: 390px;
  height: 56px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const ButtonOptionText = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-size: ${theme.FONT_SIZE.MD};
`;

export const PickerField = styled(Dropdown)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 5px;
  width: 100%;
  min-width: 300px;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  color: ${theme.COLORS.GRAY_600};
  opacity: 0.5;
`;
