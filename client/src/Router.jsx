import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import axiosInstance from './Api/axiosConfig';
import Home from './pages/Home/Home';
import QuestionPage from './pages/Questionpage/Questionpage'
import Shared from './Components/Shared/Shared';
import AnswerPage from './pages/Answer/AnswerPage';
import Howitworks from './pages/Howitworks/Howitworks';
import Auth from './pages/Auth/Auth';
import { toast } from 'react-toastify';

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
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
        toast.error('User not authenticated:', error.response.data.msg);
        setIsAuthenticated(false);
      }
    }

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
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/ask"
          element={user ? <QuestionPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/questionDetail/:questionid"
          element={user ? <AnswerPage /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Auth />} />
        <Route path="/howItWorks" element={<Howitworks />} />
      </Routes>
    </Shared>
  );
}

export default Router;