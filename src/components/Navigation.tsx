import "./Navigation.css";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContextProvider";
import styled from "styled-components";

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.disabled ? "#bbb" : "#1976d2")};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 4px 6px;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => !props.disabled && "#1565c0"};
  }
`;

const RemoveButton = styled(Button)`
  background-color: #e53935;
  margin-left: auto;
  padding: 2px 4px;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Info = styled.p`
  margin: 0 0 12px 0;
  font-size: 1rem;
  color: #555;
`;

const Navigation = () => {
  const { user } = useAuth();

  const { cart, updateQuantity, removeProduct } = useCart();

  const cartCount = cart ? cart.length : 0;

  const finalPrice = cart.reduce(
    (sum, currentProduct) =>
      sum + Number(currentProduct.price) * Number(currentProduct.quantity),
    0
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-none ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">HomePage</Link>
            </li>

            {user && (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <LogoutButton />
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <Link className="btn btn-ghost text-xl" to="/">
          Shop
        </Link>
      </div>

      <div className="navbar-end hidden lg:flex">
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <LogoutButton />
              <Link to="/" className="btn btn-ghost btn-sm">
                Home Page
              </Link>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
            </>
          ) : (
            <>
              <Link to="/" className="btn btn-ghost btn-sm">
                Home Page
              </Link>
              <Link to="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-ghost btn-sm">
                Register
              </Link>
              <Link to="/categories" className="btn btn-ghost btn-sm">
                Categories
              </Link>
            </>
          )}
          <div className="flex items-center ml-auto">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cartCount}
                  </span>
                </div>
              </div>

              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-10 mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">Cart Items:</span>
                  {cart.length > 0 ? (
                    <ul>
                      {cart.map((item, index) => (
                        <li key={index} className="mb-1">
                          <div className="flex justify-between">
                            <span>{item.name}</span>
                            <Info>
                              Price: €{item.price} &nbsp; Amount:{" "}
                              {item.quantity} &nbsp; = €
                              {Number(item.price) * Number(item.quantity)}
                            </Info>
                          </div>
                          <ButtonsWrapper>
                            <Button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <Button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                            <RemoveButton
                              onClick={() => removeProduct(item._id)}
                            >
                              Delete 😭
                            </RemoveButton>
                          </ButtonsWrapper>
                        </li>
                      ))}
                      <span className="text-info">
                        Total Price: {finalPrice}
                      </span>
                    </ul>
                  ) : (
                    <p>Your cart is empty.</p>
                  )}
                  <div className="card-actions mt-2">
                    <Link to="cart" className="btn btn-ghost btn-sm">
                      View Cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
