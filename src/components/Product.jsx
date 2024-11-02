// Component: Product.jsx
import React, { useState } from "react";
import { useAuth } from "../context/GlobalState";
import { Link } from "react-router-dom";
import "./style-header/Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Product = ({
  title,
  price,
  image, 
  rating,
  id,
  description = "No description available",
  youtubeLink,
}) => {
  const { dispatch } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        quantity: 1,
        rating: rating,
      },
    });
  };

  const handleShowMore = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product ">
      <div
        className="blurred-background-card"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <Link to={`/product/${id}`}>
        <img src={image} alt="product-img" className="product-img" />
        <div className="product-info">
          <h4 className="h4-product">
            {title.split(" ").slice(0, 3).join(" ")}
          </h4>
          <p className="product-description">
            {description.length > 20
              ? description.slice(0, 20) + "..."
              : description}
            {description.length > 20 && (
              <span className="show-more" onClick={handleShowMore}>
                Show More
              </span>
            )}
          </p>
          <p className="product-price">
            <small>$</small>
            <strong>{price.toFixed(2)}</strong>
          </p>
          <div className="product-rating">
            {Array(Math.round(rating))
              .fill()
              .map((_, i) => (
                <FontAwesomeIcon
                  icon={faStar}
                  className="product-star"
                  key={i}
                />
              ))}
          </div>
        </div>
      </Link>

      {/* {youtubeLink && (
        <a
          href={youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="youtube-link"
        >
          <button className="youtube-button">Watch Video</button>
        </a>
      )} */}

      <button className="add-to-cart" onClick={addToBasket}>
        Add to Cart
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{title}</h2>
            <p>{description}</p>
            <button className="close-modal" onClick={handleCloseModal}>
              Show Less
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
