import styled from 'styled-components/native';

export const TitlleMain = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLACK };
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD };
  font-size: ${({ theme }) => theme.FONT_SIZE.XXX };
  padding-top: 55px;
  margin-left: 15px;
  margin-bottom: 17px;

`;
export const TitlleSecondary = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLACK };
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR };
  font-size: ${({ theme }) => theme.FONT_SIZE.MD };
  margin-left: 15px;
  margin-bottom: 32px;

`;
export const ContainerEmail = styled.View`
  color: ${({ theme }) => theme.COLORS.BLACK };
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR };
  font-size: ${({ theme }) => theme.FONT_SIZE.MD };
  padding-bottom: 40px;
  padding-left: 15px;
  gap:20px;

`;
export const InputEmail = styled.TextInput`
  color: ${({ theme }) => theme.COLORS.BLACK };
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR };
  font-size: ${({ theme }) => theme.FONT_SIZE.MD };
  opacity: 0.5;
  

`;
export const ContainerSenha = styled.View`
  color: ${({ theme }) => theme.COLORS.BLACK };
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR };
  font-size: ${({ theme }) => theme.FONT_SIZE.MD };
  padding-left: 15px;
  margin-bottom: 32px;
  gap:20px;

`;
export const InputSenha = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLACK };
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR };
  font-size: ${({ theme }) => theme.FONT_SIZE.MD };
  margin-left: 15px;
  opacity: 0.5;
  

`;

export const ContainerCheckBox = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding-left: 21px;
  padding-right: 21px;

`;