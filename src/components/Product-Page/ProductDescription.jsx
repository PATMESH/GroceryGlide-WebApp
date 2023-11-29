import React from 'react'

function ProductDescription(product) {
  console.log(product);
  return (
    <div className='product-description'>
    <p>{product && product.product.ProductDescription}</p>
    </div>
  )
}

export default ProductDescription;