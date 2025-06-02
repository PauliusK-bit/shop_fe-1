import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { CartProduct, Item } from "../components/types";
import {
  CartActionTypes,
  cartInitialState,
  cartReducer,
  CartState,
} from "../reducers/CartReducer";

interface CartPageContextType extends CartState {
  addProduct: (product: Item) => void;
  removeProduct: (id: Item["_id"]) => void;
  clearCart: () => void;
  updateQuantity: (id: Item["_id"], quantity: number) => void;
  cart: CartProduct[];
}

const CartPageContext = createContext<CartPageContextType | undefined>(
  undefined
);

type CartPageContextProviderProps = {
  children: ReactNode;
};

const getCartFromLocalStorage = (): CartProduct[] => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
};

const saveCartToLocalStorage = (cart: CartProduct[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const CartPageContextProvider: React.FC<
  CartPageContextProviderProps
> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    ...cartInitialState,
    cart: getCartFromLocalStorage(),
  });
  const { cart } = state;

  const addProduct = (product: Item) => {
    dispatch({ type: CartActionTypes.ADD_ITEM, payload: product });
  };

  const removeProduct = (productId: string) => {
    dispatch({ type: CartActionTypes.REMOVE_ITEM, payload: productId });
  };

  const updateQuantity = (_id: string, quantity: number) => {
    if (quantity <= 0) return;
    dispatch({
      type: CartActionTypes.UPDATE_QUANTITY,
      payload: { _id, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: CartActionTypes.CLEAR_CART });
  };

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  return (
    <CartPageContext.Provider
      value={{
        ...state,
        addProduct,
        cart,
        removeProduct,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartPageContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartPageContext);

  if (!ctx) {
    throw new Error(
      "useCart cannot be used outside the CartPageContextProvider"
    );
  }

  return ctx;
};
