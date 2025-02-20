import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/globalStyle.ts';
import theme from '@styles/theme.ts';
import Router from './router/routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
