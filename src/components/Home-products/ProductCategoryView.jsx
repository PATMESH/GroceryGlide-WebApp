import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLocationArrow, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./ProductCard";

function ProductCategoryView(props) {
    const { products, addToCart, displayName, Category} = props;
  return (
    <div className="ProductCategoryView">
      <div className="fruits-heading">
        <h1>{displayName}</h1>
      </div>
      <div className="explore">
        <button>
          Explore more <FontAwesomeIcon icon={faLocationArrow} />
        </button>
      </div>
      <div className="products-loader">
        {products.length === 0 && (
          <div style={{ fontSize: "25px" }}>
            {" "}
            <FontAwesomeIcon
              icon={faSpinner}
              spinPulse
              size="2xl"
              style={{ color: "darkblue" }}
            />{" "}
          </div>
        )}
      </div>
      <div className="fruits-products-container">
        {products
          .filter((product) => product.Category === Category)
          .map((product) => (
            <ProductCard product={product} addToCart={addToCart} />
          ))}
      </div>
    </div>
  );
}

export default ProductCategoryView;
