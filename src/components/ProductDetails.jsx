import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./style-header/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { dispatch } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const cachedProduct = localStorage.getItem(`product_${id}`);

        if (cachedProduct) {
          setProduct(JSON.parse(cachedProduct));
          console.log("Loaded product from localStorage:", cachedProduct);
        } else {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );
          const data = await response.json();
          const foundProduct = data.meals[0];

          localStorage.setItem(`product_${id}`, JSON.stringify(foundProduct));
          setProduct(foundProduct);
          console.log(
            "Fetched and saved product to localStorage:",
            foundProduct
          );
        }
      } catch (error) {
        console.error("Error loading product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToBasket = () => {
    if (!product) return;

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product.idMeal,
        title: product.strMeal,
        price: Math.random().toFixed(2) * 100,
        image: product.strMealThumb,
        quantity: 1,
        rating: Math.floor(Math.random() * 5) + 1,
      },
    });
  };

  if (loading) {
    return (
      <div className="loading grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-h-screen items-center justify-items-center mt-4 mb-4">
        <div className="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4">
          <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md" />
          <div className="flex flex-col gap-2">
            <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md" />
            <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md" />
            <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md" />
            <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="error-message">Error loading product details.</div>;
  }

  return (
    <div className="product-details-container">
      <div
        className="blurred-background"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.8) 100%), url(${product.strMealThumb})`,
        }}
      ></div>
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.strMealThumb}
            alt={product.strMeal}
            className="product-image img-fluid"
          />
          {product.strYoutube && (
            <div className="product-video mt-4">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${
                  product.strYoutube.split("v=")[1]
                }`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h1 className="product-title">{product.strMeal}</h1>
          <p>{product.strInstructions}</p>
          <h3>Ingredients:</h3>
          <ul className="ingredients-list list-group">
            {Array.from({ length: 20 }).map((_, index) => {
              const ingredient = product[`strIngredient${index + 1}`];
              const measure = product[`strMeasure${index + 1}`];
              return (
                ingredient && (
                  <li className="ingredients-item list-group-item" key={index}>
                    {measure} {ingredient}
                  </li>
                )
              );
            })}
          </ul>
          <div className="p-4 d-flex flex-column gap-2 rud">
            <h3>Category: {product.strCategory}</h3>
            <h3>Area: {product.strArea}</h3>
            <h3>
              <b className="fs-5">
                {" "}
                Price: {parseInt(product.idMeal.toString().slice(-2))}.00 $
              </b>
            </h3>
            <h3>
              <div className="text-warning">
                {Array(parseInt(product.idMeal.toString().slice(-1)))
                  .fill()
                  .map((_, i) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      className="product-star"
                      key={i}
                    />
                  ))}
              </div>
            </h3>
            <button onClick={addToBasket} className="add-to-cart-button mt-3">
              Add to Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
