import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CheckBoxInner, CheckBoxText, Container, ContainerCheckBox } from './styles';


export function CheckBox({ label, isActive, onPressCheckBox }: CheckBoxProps) {
  const [initialValue, setInitialValue] = useState(isActive);

  useEffect(() => {
    setInitialValue(isActive);
  }, [isActive]);

  function handleChangeState() {
    const state = !initialValue;
    setInitialValue(state);
    onPressCheckBox(state);
  }

  return (
    <Container>
      <ContainerCheckBox activeOpacity={0.5} onPress={handleChangeState}>
        <CheckBoxInner>
          {initialValue && (
            <MaterialCommunityIcons size={14} name="check" color={'white'} />
          )}
        </CheckBoxInner>
      </ContainerCheckBox>
      <CheckBoxText>{label}</CheckBoxText>
    </Container>
  );
}

export type CheckBoxProps = Readonly<{
  isActive: boolean;
  label: string;
  onPressCheckBox: (state: boolean) => void;
}>;
