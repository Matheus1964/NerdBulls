import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px`;


export const ContainerCheckBox = styled.TouchableOpacity`
  width: 27px;
  height: 24px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.GRAY_700 };;
  background-color: ${({ theme }) => theme.COLORS.BLACK };`;

export const CheckBoxInner = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_200 };`;

  export const CheckBoxText = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.COLORS.BLACK };`;