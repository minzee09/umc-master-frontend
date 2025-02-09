import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/globalStyle.ts';
import theme from '@styles/theme.ts';
import Router from './router/routes.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
