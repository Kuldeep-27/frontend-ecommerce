import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyParticularOrder } from "../../../redux/slices/orderSlice";
import { useParams } from "react-router-dom";
import OrderedPage from "../../TransactionCard/OrderedPage";
import "./DetailPage.scss"


const DetailPage = () => {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(()=>{
       dispatch(getMyParticularOrder({orderId:params?.orderId}))
    },[])

    const myParticularOrder = useSelector((store) => store.orderReducer.myParticularOrder);

    let total = 0;
    myParticularOrder?.items?.map((item) => {
        total += (item.price * item.quantity);
    })

    return (
        <div className="detail-page">
            <div className="left-detail-page">
               <div className="heads">
                <h2 >Items</h2>
                {
                myParticularOrder && myParticularOrder?.items?.map((order) => <OrderedPage key={order._id} order={order}/>)
                }
               </div>
             
            </div>
            <div className="right-detail">
                <div className="amount-info">
                    <h2>Order Summary</h2>
                    <h4>Subtotal:₹{total}</h4>
                    <h4>Discount:₹{myParticularOrder?.discount}</h4>
                    <h4>Total:₹{total-myParticularOrder?.discount}</h4>

                </div>
                <div className="status">
                    <h2>Status:<span>{myParticularOrder?.status}</span></h2>
                </div>


            </div>
        </div>
    )
}

export default DetailPage;