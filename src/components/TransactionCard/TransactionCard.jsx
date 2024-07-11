import { NavLink } from "react-router-dom";
import "./TransactionCard.scss"

const TransactionCard = ({order,user}) => {
   

    let total = 0;

    order?.items.forEach((item)=>{
        total += (item.price*item.quantity);
    })

   
    return (
        <div className="transaction-card">
            <div className="items">
                {/* <h3>{user?.name}</h3> */}
                <h3>{user?.email}</h3>
                <h3>{total-order?.discount}</h3>
                {/* <h3>{order?.discount}</h3> */}
                <h3 id="status">{order?.status}</h3>
                 <NavLink id="link" to={`/admin/orderDetails/${user._id}/${order._id}`}><button className="btn">Detail</button></NavLink>


            </div>
        </div>
    )
}

export default TransactionCard;