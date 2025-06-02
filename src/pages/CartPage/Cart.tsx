import CartItem from "../../components/CartProducts";
import { useCart } from "../../contexts/CartContextProvider";

const Cart: React.FC = () => {
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div>
        <h2>Cart is empty</h2>
      </div>
    );
  }

  const finalPrice = cart.reduce(
    (sum, currentProduct) =>
      sum + Number(currentProduct.price) * Number(currentProduct.quantity),
    0
  );

  return (
    <div>
      <h2>Cart</h2>

      <p>Final Price: €{finalPrice}</p>

      <div>
        {cart.map((item) => (
          <CartItem key={item._id} data={item} />
        ))}
      </div>

      <button onClick={clearCart}>Clear Cart</button>
      <button>Checkout</button>
    </div>
  );
};

export default Cart;
