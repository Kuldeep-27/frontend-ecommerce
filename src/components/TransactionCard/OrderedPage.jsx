import { NavLink } from "react-router-dom";
import "./OrderedPage.scss"

const OrderedPage = ({order}) => {
    const {price,product,quantity} = order;
    const {image,name,_id} = product;
    const {url} = image;


    return (
        <div className="ordered-page">
            <div className="left-bar">
               <NavLink to={`/productDetail/${_id}`}><img src={url} alt="No image" /></NavLink>
               <h4>{name}</h4>
            </div>
            <div className="right-bar">
               <h4>₹{price} X {quantity} = ₹{price*quantity}</h4>
            </div>
        </div>
    )
}

export default OrderedPage