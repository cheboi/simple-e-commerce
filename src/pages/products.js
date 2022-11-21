import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import "../components/styles/product.css";
import {
  selectAllProducts,
  getProductsStatus,
  getProductsError,
  fetchProducts,
} from "../features/productSlice";
import { addToCart } from "../features/cartSlice";

const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const productStatus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);
  const navigate = useNavigate();

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  const handleCartSubmit = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
  };

  let content;

  if (productStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (productStatus === "succeeded") {
    content = products.map((product) => {
      return (
        <article>
          <div id="container">
            <div className="product-details">
              <h1>{product?.title}</h1>
              <p className="description">{product?.description}</p>
              <h5>{product?.discountRate}</h5>
              <span className="price">Kes {product?.price}</span>
              <div className="control">
                <button className="btn">
                  <span
                    className="cart"
                    onClick={() => handleCartSubmit(product)}
                  >
                    Add to Cart
                  </span>
                </button>
              </div>
            </div>
            <img
              src={product?.image}
              className="product-image"
              alt={product?.title}
            />
          </div>
        </article>
      );
    });
  } else if (productStatus === "failed") {
    content = <p>Error : {error}</p>;
  }

  return (
    <section>
      <h2>Products</h2>
      {content}
    </section>
  );
};

export default Products;
