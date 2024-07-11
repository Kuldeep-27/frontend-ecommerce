import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changeStatus, getParticularOrder } from "../../redux/slices/orderSlice";
import { particularUserDeliveryInfo } from "../../redux/slices/deliveryInfo";
import "./OrderDetails.scss"
import OrderedPage from "./OrderedPage";

function OrderDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status,setStatus] = useState();

  useEffect(() => {
     dispatch(getParticularOrder({userId:params.userId,orderId:params.orderId}))
     dispatch(particularUserDeliveryInfo({userId:params.userId}))
  }, []);

  const particularOrder = useSelector((store) => store.orderReducer.particularOrder);
  const deliveryInfo = useSelector((store) => store.deliveryInfoReducer.particularDeliveryInfo);

  let subtotal = 0;
  particularOrder?.items?.map((item) => {
    subtotal += (item.price * item.quantity)
  })

  const handleStatusChange = async (e) => {
    e.preventDefault();
    await dispatch(changeStatus({userId:params.userId,orderId:params.orderId,status}));
    navigate("/admin/transaction")

  }

  
  return (
    <div className="orderdetails-container">
       <div className="left-side">
           <h1>Items</h1>
          
          {
            particularOrder && particularOrder?.items?.map((order)=><OrderedPage key={order._id} order={order}/>)
          }
          


       </div>
       <div className="right-side">
           <h1>Order Info</h1>
           <div className="user-info">
              <h2>User Info</h2>
             <h4>Name:{deliveryInfo?.user?.name}</h4>
             <h4>Address:{deliveryInfo?.address + ", "+deliveryInfo?.city + ", " + deliveryInfo?.state + ", " + deliveryInfo?.country + ", " + deliveryInfo?.pincode}</h4>
           </div>
           <div className="amount-info">
              <h2>Amount Info</h2>
              <h4>SubTotal:₹{subtotal}</h4>
              <h4>DisCount:₹{particularOrder?.discount}</h4>
              <h4>Total:₹{subtotal - particularOrder?.discount}</h4>
           </div>
           <div className="status-info">
             <h2>Status Info</h2>
            <h4>Status:<span>{particularOrder?.status}</span></h4>
           </div>

           <form onSubmit={handleStatusChange}>
             
             <select className="input-box" name="" id="inp" onChange = {(e)=>setStatus(e.target.value)}>
                <option value="Order Confirmed">Order Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
             </select>
             <input className="btn" type="submit" value="Change Status" />
           </form>
       </div>
    </div>
  )
}

export default OrderDetails;
