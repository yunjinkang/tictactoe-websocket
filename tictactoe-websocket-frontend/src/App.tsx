import React from 'react';
import { ThemeProvider, styled } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamaPage';

const theme = {
  colors: {
    background: 'linear-gradient(to bottom right, #111827, #1f2937, #111827)',
    primary: 'rgba(17, 24, 39)'
  },
  fonts: {
    body: "'Noto Sans KR', sans-serif",
    heading: "'Noto Sans KR', sans-serif"
  },
  breakpoints: {
    mobile: "576px",
    tablet: "768px",
    desktop: "1200px"
  }
};

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout>
        <Header/>
        <Main>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/game/:roomId" element={<GamePage/>}/>
            </Routes>
          </Router>
        </Main>
        <Footer/>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
