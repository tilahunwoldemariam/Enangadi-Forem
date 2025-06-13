import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import axiosInstance from './Api/axiosConfig';
import Login from './pages/LoginPage/LoginPage';
import Home from './pages/Home/Home';
import { AuthContext } from './Context/Context';
import QuestionPage from './pages/Questionpage/Questionpage'
import Shared from './Components/Shared/Shared';
import AnswerPage from './pages/Answer/AnswerPage';

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);

  // const [{ user }, _] = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user', user);

  // Check if user is logged in
  async function checkUser() {
    try {
      await axiosInstance.get('/users/check', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('User not authenticated:', error.response);
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  // Show a loading state while checking
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  return (
    <Shared>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Home /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/ask"
          element={
            user ? <QuestionPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/questionDetail/:questionid"
          element={
            user ? <AnswerPage /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Shared>
  );
}

export default Router;