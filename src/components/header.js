import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { auth } from "../service/firebase";
import { logout, selectUser } from "../features/userSlice";
import { BsFillCartCheckFill } from "react-icons/bs";

import "./styles/header.css";

function Header() {
  const dispatch = useDispatch();
  const { cartQuantity } = useSelector((state) => state.cart);

  const logoutOfApp = () => {
    // dispatch to the store with the logout action
    dispatch(logout());
    // sign out function from firebase
    auth.signOut();
  };

  const user = useSelector(selectUser);

  return (
    <>
      <header>
        <nav className="nav">
          <ul className="nav-ul">
            <li className="nav-list">
              {user ? <button onClick={logoutOfApp}>Logout</button> : ""}
            </li>
            <li className="nav-list">
              <Link to="/cart">
                <BsFillCartCheckFill />
                <span className="bag-quantity">
                  <span className="cart-quantity">{cartQuantity}</span>
                </span>
              </Link>
            </li>
            <li className="nav-list">
              <Link to="/aboutus">About US</Link>
            </li>
            <li className="nav-list">
              <Link to="/contactus">co US</Link>
            </li>
            <li className="nav-list">
              <Link to="/addproduct">Add Product</Link>
            </li>
            <li className="nav-list">
              <Link to="/">Products</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </header>
    </>
  );
}

export default Header;
