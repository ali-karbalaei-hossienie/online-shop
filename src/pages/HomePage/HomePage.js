import * as data from "../../data";
import homepage from "./homepage.css";
import { useCart, useCartDispatch } from "../../Context/CartProvider";
import { toast } from "react-toastify";
const checkInCart = (cart, product) => {
  const findcart = cart.find((c) => c.id === product.id);
  return findcart;
};
const HomePage = () => {
  const { cart } = useCart();
  const dispatch = useCartDispatch();
  const AddProductHandler = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <section className="productList container">
      {data.products.map((product) => {
        return (
          <div className="product" key={product.id}>
            <div className="productImage">
              <img src={product.image}></img>
            </div>
            <div className="productDesc">
              <div>{product.name}</div>
              <div>$ {product.price}</div>
              <button
                className="btn primary"
                onClick={() => AddProductHandler(product)}
              >
                {checkInCart(cart, product) ? "In Cart" : "Add To Cart"}
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default HomePage;
