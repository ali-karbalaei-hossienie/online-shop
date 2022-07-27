import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();
const CartContextDispatcher = createContext();

const initialState = {
  cart: [],
  total: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const CloneState = [...state.cart];
      const index = CloneState.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < 0) {
        CloneState.push({ ...action.payload, quantity: 1 });
      } else {
        const CloneItem = { ...CloneState[index] };
        CloneItem.quantity++;
        CloneState[index] = CloneItem;
      }

      return {
        ...state,
        cart: CloneState,
        total: state.total + action.payload.price,
      };
    }

    case "DECREMENT_TO_CART": {
      const CloneState = [...state.cart];
      const index = CloneState.findIndex(
        (item) => item.id === action.payload.id
      );
      const CloneItem = { ...CloneState[index] };
      if (CloneItem.quantity === 1) {
        const filteredItem = CloneState.filter(
          (item) => item.id !== action.payload.id
        );
        return {
          ...state,
          cart: filteredItem,
          total: state.total - action.payload.price,
        };
      } else {
        const CloneItem = { ...CloneState[index] };
        CloneItem.quantity--;
        CloneState[index] = CloneItem;
        return {
          ...state,
          cart: CloneState,
          total: state.total - action.payload.price,
        };
      }
    }

    default:
      return state;
  }
};
const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <CartContext.Provider value={cart}>
        <CartContextDispatcher.Provider value={dispatch}>
          {children}
        </CartContextDispatcher.Provider>
      </CartContext.Provider>
    </div>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartContextDispatcher);
