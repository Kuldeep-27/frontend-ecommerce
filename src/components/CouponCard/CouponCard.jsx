import { useDispatch } from "react-redux";
import "./CouponCard.scss"
import { MdDelete } from "react-icons/md";
import { deleteCoupon } from "../../redux/slices/couponSlice";
import "./CouponCard.scss"

const CouponCard = ({couponDetail}) => {
    const {coupon,percentOff,_id} = couponDetail;
    const dispatch = useDispatch();

    const handleCouponDelete = () => {
          dispatch(deleteCoupon({couponId:_id}))
    }


    return (
        <div className="coupon-card-container">
            <h3>{coupon}</h3>
            <h3>{percentOff}% </h3>

            <MdDelete onClick={handleCouponDelete} />
        </div>
    )
}

export default CouponCard