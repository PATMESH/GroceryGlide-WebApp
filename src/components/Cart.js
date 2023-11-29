import React, { useEffect, useState ,useContext} from "react";
import { Navbar } from "./Navbar";
import { Icon } from "react-icons-kit";
import { ic_add } from "react-icons-kit/md/ic_add";
import { ic_remove } from "react-icons-kit/md/ic_remove";
import { iosTrashOutline } from "react-icons-kit/ionicons/iosTrashOutline";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Config/Config";
import { CartContext } from "../Global/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cart } from "react-icons-kit/entypo/cart";
import { faCartPlus, faCartShopping } from "@fortawesome/free-solid-svg-icons";

export const Cart = ({ user }) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [totalQty, setTotalQty] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const { dispatch } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    const cartRef = db
      .collection("SignedUpUsersData")
      .doc(uid)
      .collection("cart");
    cartRef.get()
      .then((querySnapshot) => {
        const newCartItems = [];
        let totalQty = 0;
        let totalPrice = 0;
        querySnapshot.forEach((doc) => {
          const cartItem = doc.data();
          totalQty += cartItem.qty;
          totalPrice += parseInt(cartItem.TotalProductPrice);
          newCartItems.push(cartItem);
        });
        setShoppingCart(newCartItems);
        setTotalQty(totalQty);
        setTotalPrice(totalPrice);
      }).then(console.log("Success"))
      .catch((error) => {
        console.error("Error getting cart items:", error);
      });
  }, []);
  console.log(shoppingCart);


  function increment(product) {
    const updatedCart = shoppingCart.map((item) => {
      if (item.id === product.id) {
        item.qty += 1;
        item.TotalProductPrice = (item.ProductPrice-item.ProductPrice*(item.DiscountPercentage/100)) * item.qty;
        setTotalQty(totalQty+1);
        setTotalPrice(totalPrice+parseInt(item.ProductPrice-item.ProductPrice*(item.DiscountPercentage/100)));
        dispatch({ type: 'INC', cart: product, id: product.id });
      }
      return item;
    });
    setShoppingCart(updatedCart);
    
    const user = auth.currentUser;
    const cartRef = db
      .collection("SignedUpUsersData")
      .doc(user.uid)
      .collection("cart");
    cartRef
      .where("id", "==", product.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cartRef.doc(doc.id).update({
            qty: doc.data().qty + 1, 
            TotalProductPrice: (doc.data().ProductPrice-doc.data().ProductPrice*(doc.data().DiscountPercentage/100)) * (doc.data().qty + 1), 
          });
        });
      })
      .catch((error) => {
        console.error("Error updating cart item:", error);
      });
  }
  
  
  function decrement(product) {
    if(product.qty<=1){
      console.log(product.qty);
      return;
    }
    dispatch({ type: 'DEC', cart: product, id: product.id });
    const updatedCart = shoppingCart.map((item) => {
      if (item.id === product.id && item.qty > 1) {
        item.qty -= 1; 
        item.TotalProductPrice = item.ProductPrice-item.ProductPrice*(item.DiscountPercentage/100) * item.qty;
        setTotalQty(totalQty-1);
        setTotalPrice(totalPrice-(item.ProductPrice-item.ProductPrice*(item.DiscountPercentage/100)));
      }
      return item;
    });
    setShoppingCart(updatedCart);
  
    const user = auth.currentUser;
    const cartRef = db
      .collection("SignedUpUsersData")
      .doc(user.uid)
      .collection("cart");
    cartRef
      .where("id", "==", product.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cartRef.doc(doc.id).update({
            qty: doc.data().qty - 1, 
            TotalProductPrice: doc.data().ProductPrice-doc.data().ProductPrice*(doc.data().DiscountPercentage/100) * (doc.data().qty - 1),
          });
        });
      })
      .catch((error) => {
        console.error("Error updating cart item:", error);
      });
  }
  

  function deleteProduct(productId) {
    const updatedCart = shoppingCart.filter((item) => item.id !== productId);
    setShoppingCart(updatedCart);
    const user = auth.currentUser;
    const cartItems = db
      .collection("SignedUpUsersData")
      .doc(user.uid)
      .collection("cart");
    cartItems
      .where("id", "==", productId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cartItems.doc(doc.id).delete();
        });
      })
      .catch((error) => {
        console.error("Error deleting cart item:", error);
      });
  }

  return (
    <>
      <Navbar user={user} />
      <div className="cart-page">
        {shoppingCart.length !== 0 && <h1>Cart <FontAwesomeIcon style={{color:'darkviolet'}} icon={faCartShopping}></FontAwesomeIcon> </h1>}
        <div className="cart-container">
          {shoppingCart.length === 0 && (
            <>
              <div >
                no items in your cart or slow internet causing trouble (Refresh
                the page) or you are not logged in
              </div>
              <div>
                <Link to="/">Return to Home page</Link>
              </div>
            </>
          )}
          {shoppingCart &&
            shoppingCart.map((cart) => (
              
              <div className="cart-card" key={cart.id}>
                <div className="cart-img">
                  <img src={cart.ProductImages[0]} alt="not found" />
                </div>

                <div className="cart-name">{cart.ProductName}</div>

                <div className="cart-price-orignal">
                  Rs {cart.ProductPrice}.00
                </div>

                <div className="cart-inc-dec">
                <div className="dec" onClick={() => decrement(cart)}>
                    <Icon icon={ic_remove} size={24} />
                  </div>

                  <div className="quantity">{cart.qty}</div>

                  <div className="inc" onClick={() => increment(cart)}>
                    <Icon icon={ic_add} size={24} />
                  </div>
                </div>

                <div className="cart-price">Rs {cart.TotalProductPrice}</div>

                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(cart.id)}
                >
                  <Icon icon={iosTrashOutline} size={24} />
                </button>
              </div>
            ))}
          {shoppingCart.length > 0 && (
            <div className="cart-summary">
              <div className="cart-summary-heading">Cart-Summary</div>
              <div className="cart-summary-price">
                <span>Total Price</span>
                <span>Rs {totalPrice}</span>
              </div>
              <div className="cart-summary-price">
                <span>Total Qty</span>
                <span>{totalQty}</span>
              </div>
              <div className="btn">
              <button className="cashout-link" onClick={()=>{
                localStorage.setItem('price', totalPrice);
                localStorage.setItem('totalQty', totalQty);
                navigate("/cashout")
              }}>
                        Cash on delivery
                    </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
