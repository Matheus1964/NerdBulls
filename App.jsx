import theme from '@theme/index'
import Login from '@screens/login'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { Loading } from '@components/Loading'
import Home from '@screens/home'
import { Routes } from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor="#BEC3C7" />

        {fontsLoaded ? <Routes /> : <Loading />}
      </ThemeProvider>
    </>
  )
}
