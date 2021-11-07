import { createGlobalStyle, ThemeProvider } from 'styled-components'; 
import {Provider} from 'next-auth/client'
import useSWR, { SWRConfig } from 'swr'
const GlobalStyle = createGlobalStyle`
html, body{
  box-sizing: border-box;
  background-color:#fafafa;
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
}
`;

const theme = {
  colour: {
    red: 'hsl(357, 100%, 60%)',
    yellow: 'hsl(47, 100%, 50%)',
    green: 'hsl(100, 66%, 46%)',
    blue: 'hsl(209, 100%, 58%)',
    purple: 'hsl(267, 100%, 66%)',
    grey: 'hsl(0, 0%, 20%)',
    black: 'hsl(0, 0%, 0%)',
    white: 'hsl(100, 100%, 100%)',
    error: 'hsl(0, 100%, 50%)',
  },
};

/**
 * Main App component
 */
function MyApp({ Component, pageProps }) {
  return (
      <Provider options={{clientMaxAge: 0, keepAlive: 0}} session={pageProps.session}>
        <SWRConfig value={pageProps}> 
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} /> 
        </ThemeProvider>
        </SWRConfig>
      </Provider>
  );
} 
export default MyApp;
