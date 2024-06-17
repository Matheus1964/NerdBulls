import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  TextCount,
  Container,
  LogoHomeBoi,
  IconGoogle,
  SubHeader,
  CityName
} from './styles';
import { Cards } from '@components/Cards';
import { useNavigation } from '@react-navigation/native';
import { cardData } from './mockCards';
import LogoBoi from '@assets/logoBoi.png';
import IconGoogleHome from '@assets/IconGoogleHome.png';
import { getDatabase, ref, onValue } from 'firebase/database';
import { auth } from '../../services/firebaseConfig';

export default function Home() {
  const [num, setNum] = useState(0);
  const navigation = useNavigation();

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

  return (
    <Container>
      <SubHeader>
        <LogoHomeBoi source={LogoBoi} />
        <TouchableOpacity>
          <IconGoogle source={IconGoogleHome} />
        </TouchableOpacity>
      </SubHeader>
      <CityName>Patos de Minas</CityName>
      <Cards card={cardData} />
      <TextCount>TOTAL DE ANIMAIS {num}</TextCount>
    </Container>
  );
}
