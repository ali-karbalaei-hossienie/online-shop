import { NavLink } from "react-router-dom";
import { useCart } from "../../Context/CartProvider";
import navigation from "./navigation.css";
import { IoIosLogIn } from "react-icons/io";
import { BiCartAlt } from "react-icons/bi";
import { useAuth } from "../../Context/AuthProvider";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const Navigation = () => {
  const [isActive, setIsActive] = useState(false);
  const { cart } = useCart();
  const datauser = useAuth();
  const TooglerHandler = () => {
    setIsActive(!isActive);
  };
  return (
    <header className="mainNavigation">
      <nav className="navbar">
        <div className={`navbarList ${isActive ? "expand" : ""}`}>
          <div className="navToggler" onClick={() => TooglerHandler()}>
            <div className="bar bar-one"></div>
            <div className="bar bar-two"></div>
            <div className="bar bar-three"></div>
          </div>
          <NavLink to="/">
            <img src="https://fronthooks.ir/images/fh-logo.svg" />
          </NavLink>
          <ul>
            <div
              className={`${isActive ? "navbarCloseExpand" : "navbarClose"}`}
            >
              <NavLink to="/">
                <img src="https://fronthooks.ir/images/fh-logo.svg" />
              </NavLink>
              <MdClose className="close" onClick={() => TooglerHandler()} />
            </div>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/cart">product</NavLink>
            </li>
            <li>
              <NavLink to="/">Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/">About-us</NavLink>
            </li>
          </ul>
        </div>
        <div className="navCart">
          <div className="navSummery">
            <NavLink to="/cart">
              <BiCartAlt className="cartBuy" />
            </NavLink>
            <span>{cart.length}</span>
          </div>
          <div className="navLogin">
            <NavLink to="/login">
              {datauser ? "" : <IoIosLogIn className="loginIcon" />}
            </NavLink>
            <NavLink to={datauser ? "" : "login"}>
              {datauser ? (
                <img
                  src="https://fronthooks.ir/images/account-icon.png"
                  alt="user"
                  className="user"
                ></img>
              ) : (
                "Login"
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;

{
  /* <nav>
<ul>
  <div className="nav">
    <li>
      <NavLink to="/">
        <img src="https://fronthooks.ir/images/fh-logo.svg" />
      </NavLink>
    </li>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
  </div>
  <div className="nav">
    <li className="cartLink">
      <NavLink to="/cart">
        <BiCartAlt />
      </NavLink>
      <span>{cart.length}</span>
    </li>
    <div className="navlogin">
      <NavLink to="/login">
        {datauser ? "" : <IoIosLogIn className="loginIcon" />}
      </NavLink>
      <NavLink to={datauser ? "/Profile" : "login"}>
        {datauser ? "Profile" : "Login"}
      </NavLink>
    </div>
  </div>
</ul>
</nav> */
}
