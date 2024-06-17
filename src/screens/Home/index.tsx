import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, BackHandler, Modal } from 'react-native';
import {
  TextCount,
  Container,
  LogoHomeBoi,
  IconGoogle,
  SubHeader,
  CityName,
  ModalContainer,
  ModalContent,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
  ModalButtonText
} from './styles';
import { Cards } from '@components/Cards';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { cardData } from './mockCards';
import LogoBoi from '@assets/logoBoi.png';
import IconGoogleHome from '@assets/IconGoogleHome.png';
import { auth } from '../../services/firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function Home() {
  const [num, setNum] = useState(0);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAnimalCount = async () => {
      try {
        const currentUser = auth.currentUser; // Obtém o usuário logado
        if (currentUser) {
          const db = getDatabase();
          const animalsRef = ref(db, `users/${currentUser.uid}/animais`);

          onValue(animalsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const animalCount = Object.keys(data).length;
              setNum(animalCount);
            } else {
              setNum(0);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching animal count:', error);
      }
    };

    fetchAnimalCount();
  }, []);

  // Hook useFocusEffect para controlar o modal
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setModalVisible(true); // Abrir o modal ao pressionar o botão de voltar
        return true; // Indicar que a ação de voltar foi manipulada
      };

      // Adicionar o listener apenas quando a tela estiver em foco
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  // Função para sair do aplicativo
  const handleExitApp = () => {
    setModalVisible(false); // Fechar o modal
    navigation.navigate('login'); // Redirecionar para a tela de login
  };

  // Função para continuar na Home
  const handleCancelExit = () => {
    setModalVisible(false);
  };

  return (
    <Container>
      <SubHeader>
        <LogoHomeBoi source={LogoBoi} />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <IconGoogle source={IconGoogleHome} />
        </TouchableOpacity>
      </SubHeader>
      <CityName>Patos de Minas</CityName>
      <Cards card={cardData} />
      <TextCount>TOTAL DE ANIMAIS {num}</TextCount>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalContent>
            <ModalText>Deseja sair do aplicativo?</ModalText>
            <ModalButtonsContainer>
              <ModalButton color="red" onPress={handleExitApp}>
                <ModalButtonText>Sim</ModalButtonText>
              </ModalButton>
              <ModalButton color="green" onPress={handleCancelExit}>
                <ModalButtonText>Não</ModalButtonText>
              </ModalButton>
            </ModalButtonsContainer>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
