import { MdDelete } from "react-icons/md";
import "./CartItem.scss";

import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";

import { NavLink } from "react-router-dom";
const CartItem = ({ product }) => {
 
  const { quantity, productId } = product;
  const { image, name, price, _id } = productId;
  const { url } = image;
  const dispatch = useDispatch();

  const handleIncrementQuantity = () => {
    dispatch(incrementQuantity({ productId: _id }));
  };

  const handleDecrementQuantity = () => {
    dispatch(decrementQuantity({ productId: _id }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ productId: _id }));
  };

  return (
    <div className="cart-item-container container">
      <div className="cart-product">
        <div className="item">
          <NavLink class="img" to={`/productDetail/${_id}`}>
            <img src={url} alt="" />
          </NavLink>
          <div className="details">
            <p>{name}</p>
            <p id="price">₹{price}</p>
          </div>
        </div>

        <div className="count">
          <div className="buttons">
            <button className="btn" onClick={handleDecrementQuantity}>
              -
            </button>
            <p>{quantity}</p>
            <button className="btn" onClick={handleIncrementQuantity}>
              +
            </button>
          </div>

          <MdDelete style={{color:"red"}} onClick={handleRemoveFromCart} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
