import React, { useContext } from "react";
import { ProductsContext } from "../../Global/ProductsContext";
import { CartContext } from "../../Global/CartContext";
import { ToastContainer, toast } from "react-toastify";
import { auth, db } from "../../Config/Config";
import Banner from "./Banner";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import ProductCategoryView from "./ProductCategoryView";

export const Products = () => {
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate()

  const addToCart = ({ id, product }) => {
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
      <div className="banner">
        <Banner />
      </div>
      <ProductCategoryView products={products } addToCart={addToCart} displayName={"Fresh Fruits & Vegetables"} Category={"Fruits and Vegetables"}/>
      <ProductCategoryView products={products } addToCart={addToCart} displayName={"Home Essential Products"} Category={"Home Essentials"}/>
      <ProductCategoryView products={products } addToCart={addToCart} displayName={"Grains and Spices"} Category={"Grains and Spices"}/>
      <ToastContainer />
    </>
  );
};
