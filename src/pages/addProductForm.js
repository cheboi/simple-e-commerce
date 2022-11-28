import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../features/productSlice";

import "../components/styles/productsForm.css";

const AddProductForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState();
  const [discountRate, setDiscountRate] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onPriceChanged = (e) => setPrice(e.target.value);
  const onDiscountChanged = (e) => setDiscountRate(e.target.value);
  const onImageChanged = (e) => setImageUrl(e.target.value);

  const canSave =
    [name, description, price, imageUrl, discountRate].every(Boolean) &&
    addRequestStatus === "idle";

  const onSaveProductClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          addNewProduct({
            name,
            price,
            imageUrl,
            discountRate,
            description,
          })
        ).unwrap();

        setName("");
        setDescription("");
        setImageUrl("");
        setPrice("");
        setDiscountRate("");
      } catch (err) {
        console.error("Failed to save the product", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  return (
    <section className="form-control">
      <form>
        <h3>Add a New Product</h3>
        <input
          type="text"
          id="productName"
          name="productName"
          value={name}
          onChange={onNameChanged}
          placeholder="Product Name"
        />
        <textarea
          id="productDesription"
          name="productDesription"
          value={description}
          onChange={onDescriptionChanged}
          placeholder="Description"
        />
        <input
          type="text"
          id="productImageUrl"
          name="productImageUrl"
          value={imageUrl}
          onChange={onImageChanged}
          placeholder="Product Image url"
        />
        <input
          type="text"
          id="productPrice"
          name="productPrice"
          value={price}
          onChange={onPriceChanged}
          placeholder="Product Price In Kenya Shillings"
        />
        <input
          type="text"
          id="productDiscountrate"
          name="productDiscountRate"
          value={discountRate}
          onChange={onDiscountChanged}
          placeholder="Discount Rate"
        />
        <button
          type="button"
          onClick={onSaveProductClicked}
          disabled={!canSave}
          className="add-btn"
        >
          Save Product
        </button>
      </form>
    </section>
  );
};
export default AddProductForm;
