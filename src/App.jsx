import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HabitsPage from './pages/HabitsPage';
import TodayPage from './pages/TodayPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from './contexts/UserContext';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage setUser={setUser} />} />
          <Route path='/cadastro' element={<SignUpPage />} />
          <Route path='/habitos' element={<HabitsPage />} />
          <Route path='/hoje' element={<TodayPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
