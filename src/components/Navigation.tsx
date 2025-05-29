import "./Navigation.css";
import LogoutButton from "./LogoutButton";

import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const { user } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-sm  ">
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
                  <Link to="/">Home Page</Link>
                </li>

                <li>
                  <Link to="/activities">Events</Link>
                </li>
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
          Learn Hub
        </Link>
      </div>

      <div className="navbar-end hidden lg:flex">
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <LogoutButton />
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
