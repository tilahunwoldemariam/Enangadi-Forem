import React from 'react'
import Header from './Components/Header/Header'
import LoginPage from './Pages/LoginPage/LoginPage';

function App() {
  return (
    <div>
      <Header isAuthenticated={false}/>
      <LoginPage />
    </div>
  );
}

export default App