import { NavLink } from "react-router-dom";
import "./AdminProductCard.scss"


const AdminProductCard = ({product}) => {

    const {image,name,price,stock,_id} = product;
    const {url} = image;

   


    return (
        <div className="admin-product-card">
            <div className="image">
           <NavLink to={`/productDetail/${_id}`}><img src={url} alt="" /></NavLink> 

            </div>
           
            <h3>{name}</h3>
            <h3>₹{price}</h3>
            <h3>{stock}</h3>
            <NavLink className="navlink" to={`/updateProduct/${product._id}`}><button className="btn btn1">Manage</button></NavLink>

        </div>
    )
}

export default AdminProductCard;