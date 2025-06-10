import React from 'react'
import Header from './Components/Header/Header'
import LoginPage from './Pages/LoginPage/LoginPage';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <Header isAuthenticated={false} />
      <LoginPage />
      <Footer />
    </div>
  );
}

export default App