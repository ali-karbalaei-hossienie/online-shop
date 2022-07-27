import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/CartPage/Cart";
import CartProvider from "./Context/CartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ckeckout from "./pages/ckeckout/Checkout";
import Login from "./pages/Login/LoginPage";
import Signup from "./pages/signup/SignupPage";
import AuthProvider from "./Context/AuthProvider";
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <ToastContainer />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Ckeckout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
