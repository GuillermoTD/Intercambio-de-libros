import { Route, Routes } from "react-router-dom";
// import NewBookPage from "./pages/NewBook/NewBookPage";
// import FilteredBooksPage from "./pages/FilteredBooksPage/FilteredBooksPage";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import PrivateRoutes from "./components/PrivateRoutes";
import { ContextApp } from "./context/ContextApp";
import { useState } from "react";
import NewBookPage from "./pages/NewBook/NewBookPage";
import FilteredBooksPage from "./pages/FilteredBooksPage/FilteredBooksPage";
import ChatPage from './pages/Chat/ChatPage'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [useProfileInfo, setUserProfileInfo] = useState({});

  const globalState = {
    isAuthenticated,
    setIsAuthenticated,
    setUserProfileInfo,
    useProfileInfo,
  };

  return (
    <ContextApp.Provider value={globalState}>
      <Routes>
        {`Rutas public`}
        <Route
          path="/"
          element={
            <PrivateRoutes
              element={<HomePage />}
              isAuthenticated={isAuthenticated}
              route="login"
            />
          }
        >
          <Route path="/newbook" element={<NewBookPage />} />
          <Route path="/books/:id" element={<FilteredBooksPage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="chat" element={<ChatPage />} />
      </Routes>
    </ContextApp.Provider>
  );
};

export default App;
