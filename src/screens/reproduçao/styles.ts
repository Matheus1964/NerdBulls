import styled from 'styled-components/native';
import theme from '@theme/index';
import { Picker } from '@react-native-picker/picker';

export const Container = styled.View`
  padding: 30px 30px 0;
  flex: 1;
  background-color: ${theme.COLORS.WHITE};
`;

export const ContainerTitulo = styled.View`
  color: blue;
  margin-top: 20px;
  align-items: flex-start;
  padding: 20px;
`;

export const ContainerForm = styled.View`
  align-items: flex-start;
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
  padding: 10px 20px;
  margin-top: 20px;
`;

export const NameTitulo = styled.Text`
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
  background-color: #F4F4F4;
  border-radius: 5px;
  width: 100%;
  min-width: 300px;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  color: ${theme.COLORS.GRAY_300};
`;

export const ErrorMessage = styled.Text`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const ButtonOption = styled.View`
  background-color: #2CB859;
  margin: 20px;
  border-radius: 5px;
  width: 300px;
  height: 56px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 20px;
`;

export const ButtonOptionText = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-size: ${theme.FONT_SIZE.MD};
`;

export const PickerField = styled(Picker)`
  background-color: #F4F4F4;
  font-size: 16px;
  color: ${theme.COLORS.GRAY_600};
`;

export const ContainerMain = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #fff;
`;

export const HeaderTopBar = styled.View`
  background-color: #6AB7E2;
  padding: 10px 12px;
  border-radius: 5px;
  //elevation: 2;
  margin-bottom: 15px;
`;

export const HeaderTopBarText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const TableHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
`;

export const Heading = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 12px;
  font-family: ${theme.FONT_FAMILY.BOLD};

`;

export const Cell = styled.Text`
  font-size: 12px;
  text-align: center;
  flex: 1;
`;

export const Heading2 = styled.Text`
  flex: 1;
  font-size: 12px;
  text-align: left;
  padding-left: 20px;
  font-family: ${theme.FONT_FAMILY.BOLD};

`;


export const Cell2 = styled.Text`
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: 12px;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  flex: 1;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 2px;
  //elevation: 1;
  border-radius: 3px;
  border-color: #fff;
  padding: 1px;
  background-color: #fff;
`;

export const Row2 = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 5px;
  //elevation: 1;
  border-radius: 3px;
  border-color: #fff;
  padding: 1px;
  background-color: #fff;
`;


