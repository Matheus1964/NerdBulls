
export type CardDataType = {
  title: string
  image: any
  link: 'home' | 'login' | 'animais' | 'cadastro' |'cadastroAnimais' | 'controlePeso'

}

export type CardType={
  card: CardDataType[]
}
