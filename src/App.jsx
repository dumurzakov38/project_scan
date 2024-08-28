import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Nav } from './components/head_components/nav';
import { Footer } from './components/footer_components/footer';
import { Main } from './components/pages/home_page/main';
import { validToken } from "./components/scripts/validToken";

import { Section_authorizationForm } from "./components/pages/login_page/section_authorizationForm";
import { Section_search } from './components/pages/search_page/section_search';
import { Section_notFound } from './components/pages/notFound_page/section_notFound';
import { processingData_GetUserLimit } from './components/scripts/processingData_GetUserLimit';
import { userInfo } from './components/scripts/userInfo';

function PrivateRoute({ element, ...props }) {
  const accessToken = localStorage.getItem('accessToken');
  const isLoggedIn = accessToken !== "" && accessToken !== null;

  return isLoggedIn ? element : <Navigate to="/" />;
}

function App() {
  validToken();
  userInfo();
  const [userIsAuthorized, setUserIsAuthorized] = useState(false);
  processingData_GetUserLimit();

  function userAuthorized() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken !== "" && accessToken !== null) {
      setUserIsAuthorized(true);
    } else {
      setUserIsAuthorized(false);
    }
  };

  useEffect(() => {
    setInterval(() => {
      userAuthorized();
    }, 100);
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav prop={userIsAuthorized}/>
        <Routes>
          <Route path="/" element={<Main userIsAuthorized={userIsAuthorized}/>} />
          <Route path="*" element={<Section_notFound />} />
          <Route path="/login" element={<Section_authorizationForm />} />
          <Route path="/search" element={<PrivateRoute element={<Section_search />} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

