import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function ProductCard(props) {
  const { product, addToCart } = props;
  return ( 
    <div className="product-card" key={product.id}>
    <Link to={`/product/${product.id}`}>
      <div className="product-img">
        <img src={product.ProductImages[0]} alt="Product" />
      </div>
      </Link>
      <div className="product-discount-badge">
        {product.DiscountPercentage > 0 && (
          <span className="badge">{product.DiscountPercentage}% Off</span>
        )}
      </div>
      <div className="name-desc">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <div className="product-name">{product.ProductName}</div>
      </Link>
      <div className="product-description">{product.productQuantity}</div>
      </div>
      <div className="card-bottom">
        <div className="product-price">
          {product.DiscountPercentage > 0 ? (
            <div>
              <p style={{ fontWeight: "bold" }}>
                Rs{" "}
                {parseInt(product.ProductPrice -
                  product.ProductPrice * (product.DiscountPercentage / 100))}.00
              </p>
              <div className="del-product-price"><del style={{color:"lightslategrey"}}>
                Rs. {product.ProductPrice}.00
              </del></div>
            </div>
          ) : (
            <p style={{ fontWeight: "bold" }}>Rs {product.ProductPrice}.00</p>
          )}
        </div>
        <div className="btn">
          <button
            className="addcart-btn"
            onClick={() => addToCart({ id: product.ProductID, product })}
          >
            Add
            <FontAwesomeIcon icon={faCartPlus} style={{ fontSize: "16px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
