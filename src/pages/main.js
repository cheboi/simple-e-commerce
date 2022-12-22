import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { login, logout, selectUser } from "../features/authSlice";
// import { auth, onAuthStateChanged } from "../service/firebase";
import Header from "../components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./products";
import AboutUs from "./AboutUs";
import Login from "../components/Login";
import Cart from "./cart";
import AddProductForm from "./addProductForm";
import Contact from "./contact";

const Main = () => {
  const dispatch = useDispatch();
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<Contact />} />
          <Route path="addproduct" element={<AddProductForm />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default Main;
