import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import { store } from '../store';
import Topbar from '../components/shared/Topbar';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  styles: {
    global: (props) => ({
      'html, body': {
        backgroundColor: props.colorMode === 'dark' ? 'gray.900' : 'gray.100',
        color: props.colorMode === 'dark' ? 'white' : 'gray.900'
      },
      a: {
        color: props.colorMode === 'dark' ? 'teal.300' : 'blue.500'
      }
    })
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Topbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
