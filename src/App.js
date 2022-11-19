import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Main from "./components/main";
import Login from "./components/login";
import Products from "./components/products";
import AboutUs from "./pages/AboutUs";
import Cart from "./pages/cart"

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Main />} />
          <Route path="products" element={<Products />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/login" component={Login} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
