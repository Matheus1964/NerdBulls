import React from 'react';
import { Dimensions, ImageSourcePropType, View, Text, TouchableOpacity, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ArrowButton from "@components/ArrowButton";
import imgVaca1 from '@assets/vaca.png';
import imgVaca2 from '@assets/vaca2.png';
import imgVaca3 from '@assets/vaca3.png';
import imgCampo from '@assets/campo.png';
import imgButton from '@assets/buttonSkip.png';
import { Header } from "@components/Header";
import logoImg from '@assets/logo.png';
import { Container, TopContainer, BottomContainer, PaginationContainer, Dot, MiddleContainer, CarouselContainer, PaddingContainer, TextTitle } from "./styles";
import { useNavigation } from '@react-navigation/native';

const { width: viewportWidth } = Dimensions.get('window');

interface TutorialItem {
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const tutorialItems: TutorialItem[] = [
  {
    title: "O melhor para seu gado",
    description: "Cuide da saúde, reprodução e bem-estar do seu rebanho com facilidade através de nosso aplicativo. Desde o controle de vacinas até o acompanhamento da reprodução, garantimos o melhor para seus animais.",
    image: imgVaca1,
  },
  {
    title: "Do pasto ao lucro",
    description: "Otimize cada etapa da produção pecuária para maximizar seus lucros. Com nosso aplicativo, você garante um caminho claro do pasto ao lucro.",
    image: imgVaca2,
  },
  {
    title: "Excelência no gerenciamento",
    description: "Administre sua propriedade com máxima precisão e eficácia. Alcance o ápice na gestão pecuária com nossa plataforma de uso intuitivo.",
    image: imgVaca3,
  },
  {
    title: "Inovação em campo",
    description: "Esteja na vanguarda da tecnologia agrícola com nossa solução inovadora. Integre dados em tempo real, implemente práticas sustentáveis e utilize ferramentas avançadas para melhorar a eficiência de sua fazenda.",
    image: imgCampo,
  }
];

export default function Tutorial() {

  const navigation = useNavigation();
  function handleAcesse(){
    navigation.navigate('acesse')

  }

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselRef = React.useRef(null);

  //funcao para avancar para proximo item do carousel
  function handleBtnClick() {
    if (currentIndex < tutorialItems.length - 1) {
      (carouselRef.current as any)?.scrollTo({ index: currentIndex + 1, animated: true });
    } else {
      handleSkip()
    }
  };

  //funcao para pular a introducao
  function handleSkip() {
    //mudar para a tela que deseja ir ao pular a introducao
    handleAcesse();
  };

  const renderItem = ({ item }: { item: TutorialItem }) => (
    <View>
      <TopContainer>
        <Image source={item.image} style={{ width: '100%', maxHeight: 300}} resizeMode="cover" />
      </TopContainer>
      <PaddingContainer>
        <MiddleContainer>
          <PaginationContainer>
            {tutorialItems.map((_, index) => (
              <Dot key={index} active={index === currentIndex} />
            ))}
          </PaginationContainer>
          <TextTitle style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{item.title}</TextTitle>
          <Text style={{ marginVertical: 10}}>{item.description}</Text>
        </MiddleContainer>
      </PaddingContainer>
      
      <BottomContainer>
        <ArrowButton onPress={handleBtnClick} image={imgButton} />
        <TouchableOpacity onPress={handleSkip}>
          <Text style={{ color: 'black', marginTop: 15 }}>Pular introdução</Text>
        </TouchableOpacity>
      </BottomContainer>
    </View>
  );

  return (
    <Container>
      <Header LogoSource={logoImg}/>
      <CarouselContainer>
        <Carousel
          ref={carouselRef}
          loop={false}
          width={viewportWidth}
          autoPlay={false}
          data={tutorialItems}
          scrollAnimationDuration={700}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={renderItem}
        />
        
      </CarouselContainer>
      
    </Container>
  );
}
