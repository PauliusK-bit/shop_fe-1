import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const userNameHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const userEmailHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const userPasswordHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const registerHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userInfo = { username, email, password };
      console.log(username, email, password);
      await api.post(`/users/register`, userInfo);
      navigate("/login");
    } catch (error) {
      console.log("Failed to register user:", error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerHandler}>
        <div className="form-control">
          <input
            placeholder="Enter your username"
            type="username"
            id="username"
            value={username}
            onChange={userNameHandler}
          />
        </div>

        <div className="form-control">
          <input
            placeholder="Enter your email"
            type="email"
            id="email"
            value={email}
            onChange={userEmailHandler}
          />
        </div>

        <div className="form-control">
          <input
            placeholder="Enter your password"
            type="password"
            id="password"
            value={password}
            onChange={userPasswordHandler}
          />
        </div>

        <button data-label="Register" className="rainbow-hover" type="submit">
          <span className="sp">Register</span>
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
