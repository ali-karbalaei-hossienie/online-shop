import { Link } from "react-router-dom";
import { useCart, useCartDispatch } from "../../Context/CartProvider";
import cartPage from "./cartPage.css";
const Cart = () => {
  const { cart, total } = useCart();
  const dispatch = useCartDispatch();
  if (!cart.length) {
    return (
      <div className="messagCart container">
        <p className="emptyCart">No Product Item!</p>
        <p className="ToHomePage">Go To Home Page</p>
      </div>
    );
  }
  const incHandler = (ItemCart) => {
    dispatch({ type: "ADD_TO_CART", payload: ItemCart });
  };

  const DecHandler = (ItemCart) => {
    dispatch({ type: "DECREMENT_TO_CART", payload: ItemCart });
  };
  return (
    <div className="cartList">
      <div>
        {cart.map((item) => {
          return (
            <div className="cartDetail" key={item.id}>
              <div className="cartImage">
                <img src={item.image}></img>
              </div>
              <div>{item.name}</div>
              <div>
                {item.discount ? (
                  <div>
                    <p className="ItemPrice">$ {item.price}</p>
                    <p>$ {item.offPrice * item.quantity}</p>
                  </div>
                ) : (
                  <div>$ {item.price * item.quantity}</div>
                )}
              </div>
              <div className="btnCart">
                <button onClick={() => DecHandler(item)}>
                  {/* {item.quantity === 1 ? "Remove" : "Decrement"} */}-
                </button>
                <button>{item.quantity}</button>
                <button onClick={() => incHandler(item)}>+</button>
              </div>
            </div>
          );
        })}
      </div>
      <CartSummery />
    </div>
  );
};

export default Cart;

const CartSummery = () => {
  const { cart, total } = useCart();
  const discount = cart.reduce(
    (acc, cur) => acc + cur.discount * cur.quantity,
    0
  );
  return (
    <div className="cartSummery">
      <h2 className="summeryTitle">Cart Summery</h2>
      <div className="summeryItem">
        <p>original total</p>
        <p>{total} $</p>
      </div>
      <div className="summeryItem">
        <p>cart discount</p>
        <p>{discount} $</p>
      </div>
      <div className="summeryItem net">
        <p className="summeryTotal">net price</p>
        <p className="summeryTotal">{total - discount} $</p>
      </div>
      <Link to="/signup?redirect=checkout">
        <button className="btn primary-checkout">Go to CheckOut</button>
      </Link>
    </div>
  );
};
