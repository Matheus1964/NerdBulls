
export type CardDataType = {
  title: string
  image: any
  link: 'home' | 'login' | 'animais' | 'cadastro'

}

export type CardType={
  card: CardDataType[]
}
