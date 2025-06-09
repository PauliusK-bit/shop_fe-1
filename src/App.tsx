import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import { CartPageContextProvider } from "./contexts/CartContextProvider";
import Cart from "./pages/CartPage/Cart";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";

function Layout() {
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      {location.pathname !== "/checkout" && <Navigation />}
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:id" element={<CategoryPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartPageContextProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </CartPageContextProvider>
  );
}

export default App;
