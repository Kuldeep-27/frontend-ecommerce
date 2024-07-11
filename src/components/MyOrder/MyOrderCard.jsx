
import { NavLink } from "react-router-dom";
import "./MyOrderCard.scss"

const MyOrderCard = ({order}) => {
    

    let total = 0;

    order?.items?.map((item) => {
      total += (item.price * item.quantity);
    })

    return (
        <div className="my-order-card">
          <h4>{order?._id}</h4>
          <h4>₹{total-order?.discount}</h4>
          <h4>{order?.statusDate}</h4>
          {/* <h4 id="status">{order?.status}</h4> */}
          <NavLink id="link" to={`/orderDetail/${order?._id}`}><button className="btn btn1">View Details</button></NavLink>
         
        </div>
    )
}

export default MyOrderCard;