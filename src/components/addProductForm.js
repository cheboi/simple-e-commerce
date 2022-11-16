import { useState } from "react";
import { useDispatch } from "react-redux";
import {addNewProduct } from '../features/productSlice';

const AddProductForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState();
  const [discountRate, setDiscountRate] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onPriceChanged = (e) => setPrice(e.target.value);
  const onDiscountChanged = (e) => setDiscountRate(e.target.value);
  const onImageChanged = (e) => setImage(e.target.value);

  const canSave =
    [title, description, price, image, discountRate].every(Boolean) &&
    addRequestStatus === "idle";

  const onSaveProductClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          addNewProduct({ title, price, image, discountRate, body: description })
        ).unwrap();

        setTitle("");
        setDescription("");
        setImage("");
        setPrice("");
        setDiscountRate("");
      } catch (err) {
        console.error("Failed to save the product", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  }
  return (
    <section>
      <h2>Add a New Product</h2>
      <form>
        <label htmlFor="productTitle">Product Title:</label>
        <input
          type="text"
          id="productTitle"
          name="productTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="productDescription">Description:</label>
        <textarea
          id="productDesription"
          name="productDesription"
          value={description}
          onChange={onDescriptionChanged}
        />
        <label htmlFor="productImage">Product Image</label>
        <input
          type="text"
          id="productImage"
          name="productImage"
          value={image}
          onChange={onImageChanged}
        />
        <label htmlFor="productTitle">Product Price:</label>
        <input
          type="text"
          id="productPrice"
          name="productPrice"
          value={price}
          onChange={onPriceChanged}
        />
        <label htmlFor="productTitle">Product discount rate:</label>
        <input
          type="text"
          id="productDiscountrate"
          name="productDiscountRate"
          value={discountRate}
          onChange={onDiscountChanged}
        />
        <button
          type="button"
          onClick={onSaveProductClicked}
          disabled={!canSave}
        >
          Save Product
        </button>
      </form>
    </section>
  );
};
export default AddProductForm;
