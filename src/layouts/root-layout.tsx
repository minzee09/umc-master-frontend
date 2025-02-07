import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import NavigationBar from '@components/NavigationBar/NavigationBar';
import Footer from '@components/Footer/Footer';

const RootLayout: React.FC = () => {
  // TODO: 로그인 로직 연결
  const [auth] = useState(false);

  return (
    <Layout>
      <NavigationBar login={auth} />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Layout>
  );
};

export default RootLayout;

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  margin-top: 80px;
`;
