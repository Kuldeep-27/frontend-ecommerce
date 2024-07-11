import React, {useState } from 'react'
import CartItem from '../CartItem/CartItem'
import "./Cart.scss"
import {useSelector } from 'react-redux'

import { axiosClient } from '../../utils/axiosClient';
import { NavLink } from 'react-router-dom';
import emptyCart from "../../../public/shopping.png"

function Cart() {

  const [discount,setDiscount] = useState(0);
  const [couponCode,setCouponCode] = useState("");
  const [isVisible,setIsVisible] = useState(false);
  const [isValidCoupon,setIsValidCoupon] = useState(false);


  const cartItems = useSelector((store) => store.cartReducer.userItems);
  

  let total = 0;

  cartItems?.items.forEach((item) => {
      total += item.quantity * item.productId?.price;
  })

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axiosClient.post("/coupon/checkValid",{couponCode});

      const result = response.result;

      if(result.message === "Valid")
      {
          const off = result.off;
          const sub = (total*off)/100;
          setDiscount(sub);
          setIsVisible(true);
          setIsValidCoupon(true);

      }
      else
      {
        setDiscount(0);
        setIsVisible(true);
        setIsValidCoupon(false);
      }



    } catch(e){
      
    }
  }

  if(!cartItems || cartItems.items.length === 0)
   return (
       <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <h1 >Cart is Empty</h1>
            <img style={{height:"40vh"}} src={emptyCart} alt="" />
       </div>

    )
 

  return (
     <div className="cart-container">
        <div className="cart-items">

           {
            cartItems?.items && cartItems.items.map((item) => <CartItem key={item._id} product={item}/>)
           }
           
        </div>
        <div className="order-summary">
        <h2>Cart Summary</h2>
         <h3>SubTotal:  ₹{total}</h3>
        
         <h3>Discount:  <span>₹{discount}</span></h3>
         <h2>Total: <span style={{color:"green"}}>₹{total-discount}</span> </h2>

         <form onSubmit={handleCouponSubmit}>
         <input className="input-box inp-box" type="text" placeholder="Coupon Code" onChange={(e)=>setCouponCode(e.target.value)} />

         <input style={{backgroundColor:"blue",padding:"5px 30px"}} className="btn" type="submit" value="Apply" />
          {isVisible && (isValidCoupon ? <p style={{color:"green",fontWeight:"800"}}>Coupon Applied**</p> : <p style={{color:"red"}}>InValid Coupon**</p>)}
         </form>
         
        <NavLink to={`/shipping-info/${discount}`}><button className="btn checkout-btn">CheckOut</button></NavLink>

      </div>
    </div>
  )
}

export default Cart