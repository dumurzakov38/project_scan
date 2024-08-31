import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Nav } from "./components/head_components/nav";
import { Footer } from "./components/footer_components/footer";
import { Main } from "./components/pages/home_page/main";
import { validToken } from "./components/scripts/validToken";

import { SectionAuthorizationForm } from "./components/pages/login_page/sectionAuthorizationForm";
import { SectionSearch } from "./components/pages/search_page/sectionSearch";
import { SectionNotFound } from "./components/pages/notFound_page/sectionNotFound";
import { processingDataGetUserLimit } from "./components/scripts/processingDataGetUserLimit";
import { userInfo } from "./components/scripts/userInfo";

function PrivateRoute({ element, ...props }) {
  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = accessToken !== "" && accessToken !== null;

  return isLoggedIn ? element : <Navigate to="/" />;
}

function App() {
  validToken();
  const [userIsAuthorized, setUserIsAuthorized] = useState(undefined);

  function userAuthorized() {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken !== "" && accessToken !== null) {
      setUserIsAuthorized(true);
    } else {
      setUserIsAuthorized(false);
    }
  }

  useEffect(() => {
    userAuthorized();
    userInfo();
    processingDataGetUserLimit();
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav prop={userIsAuthorized} setUserIsAuthorized={setUserIsAuthorized} />
        <Routes>
          <Route
            path="/"
            element={<Main userIsAuthorized={userIsAuthorized} />}
          />
          <Route path="*" element={<SectionNotFound />} />
          <Route path="/login" element={<SectionAuthorizationForm setUserIsAuthorized={setUserIsAuthorized}/>} />
          <Route
            path="/search"
            element={<PrivateRoute element={<SectionSearch />} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
