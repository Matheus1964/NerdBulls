import React from 'react';
import { Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

const ButtonImage = styled.Image`

`;

const ImageButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

interface CrossButtonProps extends TouchableOpacityProps {
  source: any;  
}

const CrossButton: React.FC<CrossButtonProps> = ({ source, onPress, ...props }) => {
  return (
    <ImageButton onPress={onPress} {...props}>
      <ButtonImage source={source} />
    </ImageButton>
  );
};

export default CrossButton;
