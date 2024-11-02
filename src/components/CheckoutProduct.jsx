import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/GlobalState";
import "./style-header/CheckoutProduct.css";

const CheckoutProduct = ({
  title,
  price,
  image,
  rating,
  id,
  hiddenButton,
  quantity = 1,
}) => {
  const { dispatch } = useAuth();
  const [productQuantity, setProductQuantity] = useState(quantity);
  const priceNumber = Number(price) || 0;

  const updateBasket = (newQuantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      itemId: id,
      quantity: newQuantity,
    });
  };

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      itemId: id,
    });
  };

  const incrementQuantity = () => {
    setProductQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateBasket(newQuantity);
      return newQuantity;
    });
  };

  const decrementQuantity = () => {
    setProductQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        const newQuantity = prevQuantity - 1;
        updateBasket(newQuantity);
        return newQuantity;
      }
      return prevQuantity;
    });
  };

  const taxRate = 0.07;
  const priceWithTax = priceNumber * (1 + taxRate);
  const total = priceWithTax * productQuantity;

  return (
    <div className="CheckoutProduct card sm-col mb-3">
      <div className="row g-0 ">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start" alt={title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="CheckoutProduct-title">{title}</h5>
            <p className="CheckoutProduct-price mt-2">
              Price before tax:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(priceNumber)}
              <br />
              <small>
                Tax (7%):{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(priceNumber * taxRate)}
              </small>
              <br />
              <strong className="text-danger mb-2 fs-5">
                Total (after tax):{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(total)}
              </strong>
            </p>
            <div className="CheckoutProduct-rating">
              {Array.from({ length: 10 }, (_, i) => (
                <FontAwesomeIcon
                  icon={faStar}
                  className={`product-star ${
                    i < rating ? "text-warning" : "text-muted"
                  }`}
                  key={i}
                />
              ))}
            </div>
            <div className="quantity-control mt-3">
              {!hiddenButton && (
                <>
                  <button
                    className="btn btn-secondary padding"
                    onClick={decrementQuantity}
                  >
                    <h4>-</h4>
                  </button>
                  <span className="hidden-quantity mx-2 fs-5 fw-1">
                    {productQuantity}
                  </span>
                  <button
                    className="btn btn-secondary padding"
                    onClick={incrementQuantity}
                  >
                    <h4>+</h4>
                  </button>
                </>
              )}
            </div>

            {!hiddenButton && (
              <button
                onClick={removeFromBasket}
                className=" mt-3 button"
              >
                Remove from Basket
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
