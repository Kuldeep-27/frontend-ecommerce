import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/slices/orderSlice";
import TransactionCard from "../TransactionCard/TransactionCard.jsx";
import "./AdminTransaction.scss"


const AdminTransaction = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
          dispatch(getAllOrders());
    },[])

    const allOrders = useSelector((store)=>store.orderReducer.allOrders);

    return (
        <div className="admin-transaction-container">
            <div className="menu-container">
                <div className="heading">
                {/* <h2>Name</h2> */}
                <h2>Email</h2>
                <h2>Amount</h2>
                {/* <h2>Discount</h2> */}
                <h2>Status</h2>
                <h2>Details</h2>

                </div>
                

                {
             allOrders.length > 0 && allOrders.map((user)=>{
               return  user.orders.map((order)=><TransactionCard key={order._id} order={order} user={user.user}/>)
             })
              }
            </div>
            
          

            
        
        </div>
    )
}

export default AdminTransaction;