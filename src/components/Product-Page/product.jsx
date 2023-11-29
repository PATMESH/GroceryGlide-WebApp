import React, { useContext } from "react";
import { auth, db } from "../../Config/Config";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";
import { Navbar } from "../Navbar";
import { ToastContainer,toast } from "react-toastify";
import { CartContext } from "../../Global/CartContext";

function Product() {
   const { id } = useParams();
   const navigate = useNavigate();
   const { dispatch } = useContext(CartContext);
   const [product , setProduct] = useState(null);
   console.log(product);
   useEffect(()=>{
      db.collection('Products')
         .doc(id)
            .get()
              .then((doc) => {
               setProduct(doc.data());
         })
   });

   const addToCart = () => {
    if(localStorage.getItem("uid")===null){
      navigate("/login")
    }
    const user = auth.currentUser;
    dispatch({ type: "ADD_TO_CART", product, id: id });
    if (user) {
      const cartRef = db
        .collection("SignedUpUsersData")
        .doc(user.uid)
        .collection("cart");
        product.qty = 1;
        product.id = id;
        product.TotalProductPrice =
        product.ProductPrice -
        product.ProductPrice * (product.DiscountPercentage / 100);
      cartRef
        .add(product)
        .then(() => {
          toast.success("Product added to cart", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.error("Error adding product to cart:", error);
          toast.error("Failed to add product to cart", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        });
    }
  };

   return (
      <>
      <Navbar user={auth.currentUser}/>
      <div className="product-page">
        {product !== null ? (
          <>
            <div className="product-top">
              <div className="product-left">
                <ProductImage product={product} />
              </div>
              <div className="product-right">
                <ProductDetails product={product} addToCart={addToCart} />
              </div>
            </div>
            <div className="product-bottom">
              <ProductDescription product={product} />
            </div>
          </>
        ) : (
          <div></div>
        )}
        <ToastContainer/>
      </div></>
);
}

export default Product;
