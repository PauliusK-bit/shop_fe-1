import styled from "styled-components";
import CartItem from "../../components/CartProducts";
import { useCart } from "../../contexts/CartContextProvider";
import { Link } from "react-router";

const CartContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 16px;
  color: #333;
`;

const FinalPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2e7d32;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1565c0;
  }
`;

const Cart: React.FC = () => {
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <CartContainer>
        <Heading>Cart is empty</Heading>
      </CartContainer>
    );
  }

  const finalPrice = cart.reduce(
    (sum, currentProduct) =>
      sum + Number(currentProduct.price) * Number(currentProduct.quantity),
    0
  );

  return (
    <CartContainer>
      <Heading>Cart</Heading>
      <FinalPrice>Final Price: €{finalPrice}</FinalPrice>
      <ItemsWrapper>
        {cart.map((item) => (
          <CartItem key={item._id} data={item} />
        ))}
      </ItemsWrapper>
      <ButtonsWrapper>
        <Button onClick={clearCart}>Clear Cart</Button>
        <Link to={`/checkout`}>Checkout</Link>
      </ButtonsWrapper>
    </CartContainer>
  );
};

export default Cart;
