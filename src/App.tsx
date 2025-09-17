import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Outlet,
} from "react-router-dom";
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
import api from "./api";

const stripePromise = loadStripe(
  "pk_test_51RVoNPPJ29FkixG5n0Df3CzRSyVAG4SvPgz7AhhHcxTLiT4DtqRUAcXTbqHJlR0bMyeESj9kejzF9sOwckqRVvGQ00JtoR8Q3m"
);

function Layout() {
  const location = useLocation();
  const showNav = location.pathname !== "/checkout";

  return (
    <>
      <ToastContainer />
      {showNav && <Navigation />}
      <Outlet />
    </>
  );
}

function CheckoutWithStripe() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cart } = useCart();

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (!cart || cart.length === 0) {
        setError("Your cart is empty");
        setLoading(false);
        return;
      }

      try {
        console.log("Sending checkout request with items:", cart.length);

        const response = await api.post("/order/checkout", {
          items: cart.map((item) => ({
            id: item._id,
            amount: Math.round(
              Number(item.price) * Number(item.quantity) * 100
            ),
            quantity: item.quantity,
          })),
        });

        console.log("Response received:", response.status);

        if (!response || response.status !== 200) {
          throw new Error(`Payment setup failed: ${response.status}`);
        }

        const data = response.data;
        setClientSecret(data.clientSecret);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Failed to fetch client secret:", err);
        setError(err.message || "Payment setup failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [cart]);

  if (loading) {
    return (
      <div className="checkout-loading">
        <p>Setting up payment system...</p>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="checkout-error">
        <h2>Something went wrong</h2>
        <p>{error || "Unable to setup payment"}</p>
        <button onClick={() => (window.location.href = "/cart")}>
          Return to cart
        </button>
      </div>
    );
  }

  const appearance = {
    theme: "stripe" as const,
  };

  return (
    <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
      <CheckoutPage clientSecret={clientSecret} />
    </Elements>
  );
}

function CompleteWithStripe() {
  const appearance = {
    theme: "stripe" as const,
  };

  return (
    <Elements stripe={stripePromise} options={{ appearance }}>
      <CompletePage />
    </Elements>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:id" element={<CategoryPage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<CheckoutWithStripe />} />
            <Route path="complete" element={<CompleteWithStripe />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
