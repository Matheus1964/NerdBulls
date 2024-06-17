
export type CardDataType = {
  title: string
  image: any
  link: 'home' | 'login' | 'animais' | 'cadastro' |'cadastroAnimais' | 'controlePeso' | 'reproduçao'

}

export type CardType={
  card: CardDataType[]
}
