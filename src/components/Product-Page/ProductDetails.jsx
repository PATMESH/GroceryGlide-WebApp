import { faCartPlus, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
function ProductDetails({ product, addToCart }) {
  console.log(product);
  return (
    <div className="product-details">
      <h2>{product.ProductName}</h2>
      <h2 style={{fontSize:"30px"}}>{product.productQuantity}</h2>
      <div className='details-category'><p>category : {product.Category}</p></div>
      <div>
          {product.DiscountPercentage > 0 ? (
            <div className='discount-price'>
              
              <p style={{ fontWeight: "bold" }}>
                Rs{" "}
                {product.ProductPrice -
                  product.ProductPrice * (product.DiscountPercentage / 100)}
              </p><del style={{ fontWeight: "initial", color: "lightslategrey" }}>
                Rs. {product.ProductPrice}.00
              </del>
            </div>
          ) : (
            <p style={{ fontWeight: "bold" }}>Rs {product.ProductPrice}.00</p>
          )}
        </div>
      <div className='product-discount'><p>{product.DiscountPercentage}% off</p></div>
      <div className='review'>
        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faStarHalfAlt}></FontAwesomeIcon>
      </div>
      <div className='product-description'><p>{product.ProductDescription}</p></div>
      <div className='add-to-cart-btn-main'><button className='add-to-cart-btn' onClick={addToCart}>Add to cart <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon></button></div>
    </div>
  );
}

export default ProductDetails;
