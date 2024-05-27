

import styled from 'styled-components/native';
import { Image } from 'expo-image';
export const TextCount =  styled.Text`
  color: ${({ theme }) => theme.COLORS.GREEN_300 };
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD};
  justify-content: center;
  align-items: center;
  margin-top: 33px;


`;
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const LogoHomeBoi = styled(Image)`
  width: 106px;
  height: 91px;
  margin-bottom: 30px;
`;
export const IconGoogle = styled(Image)`
  width: 50px;
  height: 50px;
  margin-bottom: 30px;
`;
export const SubHeader = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  
`;
export const CityName = styled.Text`
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-left: 20px;
  margin-bottom: 33px;

  color: ${({ theme }) => theme.COLORS.BLACK };
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG};
  
`;