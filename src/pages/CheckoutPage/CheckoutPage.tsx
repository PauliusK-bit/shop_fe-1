import { useState } from "react";
import { useCart } from "../../contexts/CartContextProvider";
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
  padding: 2px 4px;

  &:hover {
    background-color: #d32f2f;
  }
`;

const CheckoutPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");

  const { cart, updateQuantity, removeProduct } = useCart();

  const finalPrice = cart.reduce(
    (sum, currentProduct) =>
      sum + Number(currentProduct.price) * Number(currentProduct.quantity),
    0
  );

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const surnameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSurname(event.target.value);

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const phoneHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(event.target.value);

  const formHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !surname || !email || !phone) {
      setFormError("Visi laukai yra privalomi");
    } else {
      setFormError("");
      console.log("Vartotojo informacija:");
      console.log("Vardas:", name);
      console.log("Pavardė:", surname);
      console.log("Email:", email);
      console.log("Telefonas:", phone);

      setName("");
      setSurname("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <>
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      <form onSubmit={formHandler}>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={nameHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            name="surname"
            id="surname"
            value={surname}
            onChange={surnameHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={phone}
            onChange={phoneHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={emailHandler}
          />
        </div>
        <button type="submit">Pateikti</button>
      </form>

      <div>
        <h2>Krepselio prekes</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <p>
                {" "}
                Price: €{item.price} &nbsp; Amount: {item.quantity} &nbsp; = €
                {Number(item.price) * Number(item.quantity)}
              </p>
              <ButtonsWrapper>
                <Button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <Button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </Button>
                <RemoveButton onClick={() => removeProduct(item._id)}>
                  Delete 😭
                </RemoveButton>
              </ButtonsWrapper>
            </li>
          ))}

          <span className="text-info">Total Price: {finalPrice}</span>
        </ul>
      </div>
    </>
  );
};

export default CheckoutPage;
