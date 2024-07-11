import { NavLink } from "react-router-dom";
import "./ProductCard.scss"

import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";


const ProductCard = ({product}) => {
    
    const {name,price,image,stock,_id} = product;
    const url = image.url;
    const dispatch = useDispatch();
   
    const handleAddToCart = async () => {
        
         dispatch(addToCart({ productId:product._id}))
    }

    return (
        <div className="card-container">
            <div className="image">
                <img src={url} alt="Not Found" />
            </div>
            <div className="card-info">
               <p>{name}</p>
               <p className="price">₹{price}</p>
            </div>
            <div className="stock-count">
            {
                stock <= 5 && stock >=1 && <p style={{color:"red"}}>Hurry, Only {stock} Left</p>
                
            }
            {
               stock === 0 && <p style={{color:"red"}}>Currently UnAvailable</p>
            } 

            </div>
          

            <div className="card-buttons">

                <NavLink to={`/productDetail/${_id}`}><button className="button1 btn">DETAILS</button></NavLink>
                <button className="button2 btn" onClick={handleAddToCart}>ADD CART</button>
            </div>

           


        </div>
    )
}

export default ProductCard;