import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {
  TextCount,
  Container,
  LogoHomeBoi,
  IconGoogle,
  SubHeader,
  CityName
} from './styles'
import { Cards } from '@components/Cards'
import { useNavigation } from '@react-navigation/native'
import { cardData } from './mockCards'
import LogoBoi from '@assets/logoBoi.png'
import IconGoogleHome from '@assets/IconGoogleHome.png'

export default function Home() {
  const num = 10
  const navigation = useNavigation()

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
  )
}
