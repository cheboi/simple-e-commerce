import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
// import { auth } from "../service/firebase";
import { logout} from "../features/authSlice";
import { BsFillCartCheckFill } from "react-icons/bs";

import "./styles/header.css";

function Header() {
  const dispatch = useDispatch();
  const { cartQuantity } = useSelector((state) => state.cart);

  const logoutOfApp = () => {
    // dispatch to the store with the logout action
    dispatch(logout());
    // sign out function from firebase
    // auth.signOut();
  };


  return (
    <nav className="nav">
      <h1 className="my-logo">
        <Link to="/">Products</Link>
      </h1>
      <ul className="nav-ul">
        <li className="nav-list">
          <Link to="/addproduct">Add Product</Link>
        </li>
        <li className="nav-list">
          <Link to="/aboutus">About US</Link>
        </li>
        <li className="nav-list">
          <Link to="/contactus">contact US</Link>
        </li>
        <li className="nav-list">
          <Link to="/login">Login</Link>
        </li>
        <li className="nav-list">
          <Link to="/cart">
            <BsFillCartCheckFill />
            <span className="bag-quantity">
              <span className="cart-quantity">{cartQuantity}</span>
            </span>
          </Link>
        </li>
        
        {/* <li className="nav-list">
          {user ? <button onClick={logoutOfApp}>Logout</button> : ""}
        </li> */}
      </ul>
      <Outlet />
    </nav>
  );
}

export default Header;
