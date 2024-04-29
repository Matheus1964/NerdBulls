import theme from '@theme/index'
import Login from './src/screens/Login'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor="#BEC3C7" />

        <Login />
      </ThemeProvider>
    </>
  )
}
