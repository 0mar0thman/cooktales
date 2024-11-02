import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faBarsStaggered,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";
import "./style-header/HeaderPopup.css";

const Header = () => {
  const userName = localStorage.getItem("userName");
  const { user, basket } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const categories = ["Seafood", "Pasta", "Dessert"];
  const fetchSearchResults = async (query) => {
    const results = [];
    try {
      for (const category of categories) {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const data = await response.json();

        if (data.meals) {
          const filteredMeals = data.meals.filter((meal) =>
            meal.strMeal.toLowerCase().includes(query.toLowerCase())
          );

          results.push(...filteredMeals);
        }
      }
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleAuthentication = () => {
    auth.signOut();
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query) {
      fetchSearchResults(query);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <nav className="navbar">
      <div className="container-fluid ml">
        <div className="row justify-content-between width">
          <div className="col-12 d-flex justify-content-between align-items-center style-lg-se1">
            <Link to="/" className="navbar-brand text-white col-1">
              <FontAwesomeIcon
                icon={faCookieBite}
                size="2xl"
                className="fs-10"
                style={{ color: "#FFD43B" }}
              />
            </Link>
            <span className="col-4 text-center">
              <h6 className="mb" style={{ color: "#FFD43B" }}>
                Hello,
              </h6>
              {user ? userName.split(" ").slice(0, 1).join(" ") : "Guest"}
            </span>
            <Link
              to={!user ? "/login" : "/"}
              className="col-5 text-end sign"
              onClick={handleAuthentication}
            >
              {user ? "Sign Out" : "Sign In"}
              <FontAwesomeIcon
                icon={faAngleRight}
                size="lg"
                style={{ color: "#FFD43B" }}
                className="faAngleRight"
              />
            </Link>
          </div>
        </div>

        <div className="container">
          <input
            type="text"
            name="text"
            className="input"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="search__btn">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="lg"
              style={{ color: "#FFD43B" }}
            />
          </button>
        </div>

        {searchTerm && searchResults.length > 0 && (
          <div className="search-popup">
            {searchResults.map((result) => (
              <Link to={`/product/${result.idMeal}`}>
                <div
                  key={result.idMeal}
                  className="search-item"
                  onClick={() => setSearchResults([])}
                >
                  <img
                    src={result.strMealThumb}
                    alt={result.strMeal}
                    className="search-image"
                  />
                  <div className="text-black fw-600">{result.strMeal}</div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <ul className="navbar-nav mb-2 ml mb-lg-0">
          <Link to="/orders" className="Orders">
            <FontAwesomeIcon
              icon={faBarsStaggered}
              className="p-2"
              style={{ color: "#FFD43B" }}
            />
          </Link>
          <li className="nav-orders">
            <Link to="/checkout" className="nav-shopping">
              <FontAwesomeIcon icon={faCartShopping} size="lg" />
              <span className="header-basketCount text-warning fw-700">
                {basket?.length}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
