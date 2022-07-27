import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { useCart } from "../../Context/CartProvider";
import checkout from "./checkout.css";
const Checkout = () => {
  const Auth = useAuth();
  const { cart, total } = useCart();
  const Navigate = useNavigate();
  useEffect(() => {
    if (!cart.length) Navigate("/");
  }, []);

  const TotalPrice = () => {
    const discount = cart.reduce(
      (acc, cur) => acc + cur.discount * cur.quantity,
      0
    );
    const Total = total - discount;
    return Total;
  };

  if (!Auth) {
    return (
      <div>
        <NavLink to="/login">
          <h2>please Login </h2>
        </NavLink>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div>
        <NavLink to="/">
          <h2>Go To shopping </h2>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkoutDetail">
        <h3>checkout detail</h3>
        <div className="checkoutDesc">
          <p>
            name <span>{Auth.name}</span>
          </p>
          <p>
            email <span>{Auth.email}</span>
          </p>
          <p>
            phoneNumber <span>{Auth.phoneNumber}</span>
          </p>
        </div>
      </div>
      <div className="checkoutSummery">
        <h3>your order </h3>
        <div>
          <div className="checkoutproduct">
            <p>product </p>
            <p>price</p>
          </div>
          {cart.map((product) => {
            return (
              <div className="checkoutItem">
                <div className="checkoutprice">
                  <p>
                    {product.name}
                    <span>{`${product.offPrice} * ${product.quantity} `}</span>
                  </p>
                  <p>{product.offPrice * product.quantity}</p>
                </div>
              </div>
            );
          })}
          <div className="checkoutTotal">
            <p>Total</p>
            <p>{TotalPrice()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
