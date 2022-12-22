import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";

import "../components/styles/product.css";
import {
  selectAllProducts,
  getProductsStatus,
  getProductsError,
  fetchProducts,
} from "../features/productSlice";
import { addToCart, addItemToCart } from "../features/cartSlice";

const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const productStatus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const handleCartSubmit = (cartItem) => {
    dispatch(addItemToCart(cartItem));
    console.log(cartItem);
    // navigate("/cart");
  };

  let content2;

  if (productStatus === "loading") {
    content2 = <p>Loading...</p>;
  } else if (productStatus === "succeeded") {
    content2 = products.map((product) => {
      return (
        <article>
          <div id="container" key={product.id}>
            <div className="product-details">
              <h1>{product?.name}</h1>
              <p className="description">{product?.description}</p>
              <h5>{product?.discountRate}</h5>
              <span className="price">Kes {product?.price}</span>
              <div className="control">
                <button className="btn">
                  <span
                    className="cart"
                    onClick={() => {
                      handleCartSubmit(product);
                    }}
                  >
                    Add to Cart
                  </span>
                </button>
              </div>
            </div>
            <img
              src={product?.imageUrl}
              className="product-image"
              alt={product?.name}
            />
          </div>
        </article>
      );
    });
  } else if (productStatus === "failed") {
    content2 = <p>Error : {error}</p>;
  }

  return (
    <section>
      <h2>Products</h2>
      {content2}
    </section>
  );
};

export default Products;
