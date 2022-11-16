import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { auth } from "../service/firebase";
import { logout, selectUser } from "../features/userSlice";

import "./styles/header.css";

function Header() {
  const dispatch = useDispatch();

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
              <Link to="/About">About US</Link>
            </li>
            <li className="nav-list">
              <Link to="/contacts">Contact US</Link>
            </li>
            <li className="nav-list">
              <Link to="/products">Products</Link>
            </li>
            <li className="nav-list">
              <Link to="/">LOG&PRoDU*CTs</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </header>
    </>
  );
}

export default Header;
