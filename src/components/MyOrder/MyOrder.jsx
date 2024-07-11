import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../redux/slices/orderSlice';
import MyOrderCard from './MyOrderCard';
import "./MyOrder.scss"


function MyOrder() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getMyOrders());
  },[])

  const myOrders = useSelector((store)=>store.orderReducer.myOrders);

  if(!myOrders || myOrders?.orders?.length === 0)
  {
    return <h1 style={{height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}>No Order Found</h1>
  }


  return (
   <div className="my-order-container">
    <div className="title-bar">
      <h3>OrderId</h3>
      <h3>Price</h3>
      <h3>Date</h3>
      {/* <h3>Status</h3> */}
      <h3>View</h3>
     
    </div>
     {
      myOrders.orders.map((order) => <MyOrderCard key={order._id} order={order}/> )
     }

   </div>
  )
}

export default MyOrder