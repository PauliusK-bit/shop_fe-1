import { useCart } from "../contexts/CartContextProvider";
import { CartProduct } from "./types";

type CartItemProps = {
  data: CartProduct;
};

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const { updateQuantity, removeProduct } = useCart();
  const { name, _id, quantity, price } = data;

  return (
    <div>
      <h3>{name}</h3>
      <p>
        Price: €{price} Amount: {quantity} = €{Number(price) * Number(quantity)}
      </p>

      <button
        onClick={() => updateQuantity(_id, quantity - 1)}
        disabled={quantity <= 1}
      >
        -
      </button>

      <button onClick={() => updateQuantity(_id, quantity + 1)}>+</button>
      <button onClick={() => removeProduct(_id)}>Remove From Cart</button>
    </div>
  );
};

export default CartItem;
