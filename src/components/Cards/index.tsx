import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import styled, { CardItem, CardButton, Teste } from './styles'
import LogoSource from '../../assets/logo.png'
import { CardType } from './type'
import { useNavigation } from '@react-navigation/native'



export function Cards({ card }: CardType) {
  const navigation = useNavigation()
  function handleAnimais(rota:string) {
    navigation.navigate(rota)
  }
  return (
    <CardButton>
      {card?.map((data, index) => (
        <TouchableOpacity key={index} onPress={() => handleAnimais(data.link)}>
          <CardItem>
            <Teste>
            <Image width={30} height={50} source={data.image} />
            </Teste>
            <Text>{data.title}</Text>
          </CardItem>
          
        </TouchableOpacity>
      ))}
    </CardButton>
  )
}

