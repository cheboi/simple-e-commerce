import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import ProductsExcerpt from "./ProductsExcerpt";
import AddProductForm from "./addProductForm";

import "./styles/product.css";
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

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  const handleCartSubmit = (product) => {
    dispatch(addToCart(product));
    // history.push("/cart");
  };

  // var arrayProduct = [];
  // arrayProduct.push(product)
  let content;
  // console.log(products);

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
              <div className="control">
                <button className="btn">
                  <span className="price">Kes {product?.price}</span>
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
      <AddProductForm />
      {content}
    </section>
  );
};

export default Products;
