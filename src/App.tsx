import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="853164568689-4k5835ds6uku987hjqugotosrotu793s.apps.googleusercontent.com">
        <AuthProvider>
          <BrowserRouter>
            <ToastContainer />
            <Navigation />
            <Routes>
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
