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

const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectAllProducts);
  const productStatus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, []);

  var arrayProduct = [];
  arrayProduct.push(products);
  let content;
  console.log(arrayProduct);

  if (productStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (productStatus === "succeeded") {
    content = arrayProduct.map((product) => {
      return (
        <article>
          <img
            src={product?.img_url}
            className="card-img"
            alt={product?.title}
          />
          <h3>{product?.title}</h3>
          <p className="description">{product?.description}</p>
          <p>{product?.price}</p>
          <p>{product?.discount_rate}</p>
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
