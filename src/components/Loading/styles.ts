import styled from "styled-components/native";
import { withTheme } from 'styled-components';
import theme from "@theme/index";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.COLORS.GRAY_600};
`;

export const LoadIndicator = styled.ActivityIndicator.attrs({ color: theme.COLORS.GRAY_700 })``;


















/*
import { Theme } from '@theme/index';

interface ContainerProps {
  theme?: Theme;
}
export const Container = styled.View<ContainerProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  //background-color: ${({ theme = { COLORS: { WHITE: '#FFFFFF' } } }) => theme.COLORS.WHITE};
  background-color: ${({theme}) => theme && theme.COLORS.GRAY_600};
`;

export const LoadIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_700
}))``;*/