import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/userSlice";
import { auth, onAuthStateChanged } from "../service/firebase";
import Header from "../components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../components/login";
import Products from "./products";
import AboutUs from "./AboutUs";
import Cart from "./cart";
import AddProductForm from "./addProductForm";
import Contact from './contact';

const Main = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // check at page load if a user is authenticated
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      {/* <Header/> */}

      {!user ? (
        // display the login form
        <Login />
      ) : (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="contactus" element={<Contact />} />
            <Route path="addproduct" element={<AddProductForm />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};
export default Main;
