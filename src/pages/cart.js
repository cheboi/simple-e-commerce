import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseCart,
  getTotals,
  clearCart,
  removeCartItem,
} from "../features/cartSlice";

import "../components/styles/cart.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeCartItem(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // console.log(cart);

  return (
    <div className="cart-container">
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="go-shop">
            <Link to="/">
              <span>Go Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="items">
          <div className="cart-items">
            {cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img src={cartItem.image} alt={cartItem.title} />
                    <div className ="right-card">
                      <h3>{cartItem.title}</h3>
                      <p>{cartItem.description}</p>
                      <p className="cart-product-price">
                        Price in Ksh:{cartItem.price}
                      </p>
                      <div className="cart-product-quantity">
                        <button onClick={() => handleDecreaseCart(cartItem)}>
                          -
                        </button>
                        <div className="count">{cartItem.cartQuantity}</div>
                        <button onClick={() => handleAddToCart(cartItem)}>
                          +
                        </button>
                      </div>
                      <div className="cart-product-total-price">
                        Total Amount: ksh:{" "}
                        {cartItem.price * cartItem.cartQuantity}
                      </div>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="subtotal">
              <span>Subtotal </span>
              <span className="amount">Ksh: {cart.totalAmount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
