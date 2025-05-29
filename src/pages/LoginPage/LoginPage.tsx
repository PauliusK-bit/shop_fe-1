import { ChangeEvent, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api";
import "./LoginPage.css";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const userEmailHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const userPasswordHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const loginInfo = { email, password };
      const { data } = await api.post(`/users/login`, loginInfo);

      const { token } = data;

      if (token) {
        login(token);
        toast.success("Logged in");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log("Failed to login", error);
    }
  };

  return (
    <div className="loginForm">
      <h1>Login</h1>

      <form onSubmit={loginHandler}>
        <div className="form-control input input-primary">
          <input
            placeholder="Enter your email"
            className="max-w-xs"
            type="email"
            id="email"
            value={email}
            onChange={userEmailHandler}
          />
        </div>
        <div className="form-control input input-primary">
          <input
            placeholder="Enter your password"
            className="max-w-xs"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={userPasswordHandler}
          />
          <button
            type="button"
            onClick={togglePassword}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label={
              showPassword ? "Slaptažodis matomas" : "Slaptažodis slepiamas"
            }
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
