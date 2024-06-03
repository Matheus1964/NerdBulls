import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { ButtonImage, ContainerBtn } from './styles';

interface SkipButtonProps {
  onPress: () => void;
  image: ImageSourcePropType;
}

export default function SkipButton({ onPress, image }: SkipButtonProps): JSX.Element {
  return (
    <ContainerBtn onPress={onPress}>
      <ButtonImage source={image} />
    </ContainerBtn>
  );
}