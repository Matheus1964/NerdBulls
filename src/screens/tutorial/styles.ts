import styled from 'styled-components/native';
import theme from '@theme/index';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.GRAY_100};
`;

export const CarouselContainer = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.GRAY_100};
`;

export const TopContainer = styled.View`
  background-color: ${theme.COLORS.GREEN_300};
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

export const MiddleContainer = styled.View`
  padding: 20px;
  align-items: center;
  background-color: ${theme.COLORS.GRAY_100};
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

`;

export const PaddingContainer = styled.View`
  background-color: ${theme.COLORS.GREEN_300};`;

export const BottomContainer = styled.View`
  background-color: ${theme.COLORS.GRAY_100};
  align-items: center;
  margin-top: -10px;
`;

export const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.COLORS.GRAY_100};
  padding: 10px;
`;

export const Dot = styled.View<{ active: boolean }>`
  width: 30px;
  height: 3px;
  background-color: ${theme.COLORS.GRAY_100};
  border-radius: 5px;
  background-color: ${props => (props.active ? `${theme.COLORS.GREEN_300}` : `${theme.COLORS.GRAY_300}`)};
  margin-left: 2px;
  margin-right: 2px;
`;

export const TextTitle = styled.Text`
  color: ${theme.COLORS.GREEN_300};
`;
