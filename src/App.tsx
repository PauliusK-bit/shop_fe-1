import { useState, useEffect } from "react";
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
import { useCart } from "./contexts/CartContextProvider";
import Cart from "./pages/CartPage/Cart";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CompletePage from "./pages/CompletePage/CompletePage";

const stripePromise = loadStripe(
  "pk_test_51RVoNPPJ29FkixG5n0Df3CzRSyVAG4SvPgz7AhhHcxTLiT4DtqRUAcXTbqHJlR0bMyeESj9kejzF9sOwckqRVvGQ00JtoR8Q3m"
);

function Layout({ clientSecret }: { clientSecret: string | null }) {
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
        <Route
          path="checkout"
          element={<CheckoutPage clientSecret={clientSecret} />}
        />
        <Route path="complete" element={<CompletePage />} />
      </Routes>
    </>
  );
}

function App() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cart } = useCart();

  useEffect(() => {
    if (cart && cart.length > 0) {
      const fetchClientSecret = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            "http://localhost:3009/api/order/checkout",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                items: cart.map((item) => ({
                  id: item._id,
                  amount: Number(item.price) * Number(item.quantity) * 100,
                })),
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setClientSecret(data.clientSecret);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.error("Failed to fetch client secret:", err);
          setError(err.message || "Failed to fetch client secret.");
        } finally {
          setLoading(false);
        }
      };

      fetchClientSecret();
    } else {
      setLoading(false);
    }
  }, [cart]);

  const appearance: { theme: "stripe" | "night" | "flat" } = {
    theme: "stripe",
  };
  const options = clientSecret
    ? {
        clientSecret,
        appearance,
      }
    : undefined;

  return (
    <AuthProvider>
      <BrowserRouter>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <Layout clientSecret={clientSecret} />
          </Elements>
        )}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
