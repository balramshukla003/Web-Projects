import React, { useState, useEffect, useContext } from 'react';
import { Router, Routes, Route } from 'react-router-dom';

import LoginPage from './component/LoginPage.jsx';
import SignUpPage from './component/SignUpPage.jsx';
import { useAuth } from './context/AuthProvider.jsx';
import ChatUi from './component/ChatUi.jsx';
import SocketExample from './component/socketExample.jsx';
import ChattingUi from './component/Chat Ui/ChattingUi.jsx';

function App() {
  const { userLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={userLoggedIn ? <ChatUi /> : <LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/example" element={<ChatUi />} />
      <Route path="/ex" element={<SocketExample />} />
      <Route path="/ex2" element={<ChattingUi />} />
    </Routes>
  );
}

export default App;
