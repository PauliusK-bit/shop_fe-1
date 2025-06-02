import styled from "styled-components";
import { useCart } from "../contexts/CartContextProvider";
import { CartProduct } from "./types";

type CartItemProps = {
  data: CartProduct;
};

const ItemContainer = styled.div`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  color: #333;
`;

const Info = styled.p`
  margin: 0 0 12px 0;
  font-size: 1rem;
  color: #555;
`;

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
  padding: 8px 12px;
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
  padding: 8px 16px;

  &:hover {
    background-color: #d32f2f;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const { updateQuantity, removeProduct } = useCart();
  const { name, _id, quantity, price, image } = data;

  return (
    <ItemContainer>
      <ImageContainer>
        <Image src={image} alt="Produkto paveikslėlis" />
      </ImageContainer>
      <Title>{name}</Title>
      <Info>
        Price: €{price} &nbsp; Amount: {quantity} &nbsp; = €
        {Number(price) * Number(quantity)}
      </Info>
      <ButtonsWrapper>
        <Button
          onClick={() => updateQuantity(_id, quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </Button>
        <Button onClick={() => updateQuantity(_id, quantity + 1)}>+</Button>
        <RemoveButton onClick={() => removeProduct(_id)}>
          Remove From Cart
        </RemoveButton>
      </ButtonsWrapper>
    </ItemContainer>
  );
};

export default CartItem;
