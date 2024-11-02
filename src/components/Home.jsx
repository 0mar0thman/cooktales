// Component: Home.js
import "./style-header/Home.css";
import imgBg from "../Images/imgBg.jpg";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

const Home = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  const categories = [
    "Beef",
    "Chicken",
    "Dessert",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Vegetarian",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let categorizedProducts = {};

        const cachedProducts = localStorage.getItem("categorizedProducts");

        if (cachedProducts) {
          categorizedProducts = JSON.parse(cachedProducts);
          console.log(
            "Loaded products from localStorage:",
            categorizedProducts
          );
        } else {
          for (let i = 0; i < categories.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response = await fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories[i]}`
            );
            const products = await response.json();

            if (products.meals) {
              const productDetailsArray = [];

              for (let j = 0; j < products.meals.length; j++) {
                const product = products.meals[j];

                const productDetailsResponse = await fetch(
                  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${product.idMeal}`
                );
                const productDetailsData = await productDetailsResponse.json();
                // await new Promise((resolve) => setTimeout(resolve, 5000));
                if (productDetailsData.meals) {
                  productDetailsArray.push(productDetailsData.meals[0]);
                }
              }

              categorizedProducts[categories[i]] = productDetailsArray;
            }
          }

          localStorage.setItem(
            "categorizedProducts",
            JSON.stringify(categorizedProducts)
          );
          console.log(
            "Fetched and saved products to localStorage:",
            categorizedProducts
          );
        }

        setProductsByCategory(categorizedProducts);
      } catch (error) {
        console.error("Error fetching products with details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    const loadingElementsCount = categories.length;

    return (
      <div className="loading grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 min-h-screen items-center justify-items-center mt-4">
        {Array.from({ length: loadingElementsCount }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4"
          >
            <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md" />
            <div className="flex flex-col gap-2">
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md" />
              <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md" />
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md" />
              <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`home`}>
      {/* <div className="image-container">
        <img src={homeImg} className="home-img" alt="Home" />
        <h1 className="CookTales">
          CookTales<p>e-commerce</p>
        </h1>
      </div> */}

      <div className="home-container">
        {categories
          .sort(
            (a, b) =>
              (productsByCategory[b]?.length || 0) -
              (productsByCategory[a]?.length || 0)
          )
          .map((category) => {
            const categoryProducts = productsByCategory[category];
            const firstProductImage =
              categoryProducts && categoryProducts.length > 0
                ? categoryProducts[0].strMealThumb
                : imgBg;
            return (
              <div
                className={`category-section
              ${category === "Dessert" ? "dessert-category" : ""} 
              ${category === "Beef" ? "Beef-category" : ""} 
              ${category === "Vegetarian" ? "Vegetarian-category" : ""}
              ${category === "Chicken" ? "Chicken-category" : ""}
              ${category === "Seafood" ? "Seafood-category" : ""}
              ${category === "Pork" ? "Pork-category" : ""}
              ${category === "Side" ? "Side-category" : ""}
              ${category === "Lamb" ? "Lamb-category" : ""}
              ${category === "Miscellaneous" ? "Miscellaneous-category" : ""}
              ${category === "Pasta" ? "Pasta-category" : ""}`}
                key={category}
              >
                <div
                  className="blurred-background"
                  style={{
                    backgroundImage: `url(${firstProductImage})`,
                  }}
                ></div>
                <h2>{category}</h2>
                <div>
                  <div>
                    {productsByCategory[category] &&
                    productsByCategory[category].length > 0 ? (
                      <Swiper
                        className="swiper"
                        spaceBetween={10}
                        slidesPerView={6}
                        navigation
                        pagination={{ clickable: true }}
                        modules={[Navigation]}
                        breakpoints={{
                          320: {
                            slidesPerView: 1.5,
                          },
                          480: {
                            slidesPerView: 2,
                          },
                          768: {
                            slidesPerView: 3,
                          },
                          1024: {
                            slidesPerView: 4,
                          },
                          1280: {
                            slidesPerView: 6,
                          },
                        }}
                      >
                        {productsByCategory[category]
                          .slice(0, 20)
                          .map((product, index) => (
                            <SwiperSlide key={index}>
                              <Product
                                id={product.idMeal}
                                image={
                                  product.strMealThumb || "default-image.jpg"
                                }
                                price={parseInt(
                                  product.idMeal.toString().slice(-2)
                                )}
                                title={product.strMeal}
                                Area={product.strArea}
                                rating={parseInt(
                                  product.idMeal.toString().slice(-1)
                                )}
                                description={
                                  product.strInstructions ||
                                  "No description available"
                                }
                                category={category}
                                youtubeLink={product.strYoutube || "#"}
                              />
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    ) : (
                      <p>No products available in this category.</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
