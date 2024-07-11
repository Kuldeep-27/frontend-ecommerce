import { useEffect, useState } from "react"
import "./Coupon.scss"
import { useDispatch, useSelector } from "react-redux"
import { generateCoupon, getAllCoupons } from "../../redux/slices/couponSlice";
import CouponCard from "../CouponCard/CouponCard";

const Coupon = () => {

    const [coupon,setCoupon] = useState("");
    const [percentOff,setPercentOff] = useState(0);

    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(getAllCoupons());
    },[])

    const allCoupons = useSelector((store)=>store.couponReducer.allCoupons);

    const handleSubmit = async(e) => {
        e.preventDefault();

        dispatch(generateCoupon({
            coupon,
            percentOff
        }))
      
        
    }

    return (
        <div className="coupon-container">
        

            <div className="right">
               <h2>Generate Coupon</h2>
               <form onSubmit={handleSubmit}>
                <label htmlFor="cpn">Coupon Code</label>
                <input id="cpn" type="text" placeholder="Enter Coupon Code" onChange={(e)=>setCoupon(e.target.value)} />

                <label htmlFor="off">Percentage OFF</label>
                <input id="off" type="number" onChange={(e) => setPercentOff(e.target.value)} />

                <input className="btn" type="submit" value="Generate" />
               </form>
            </div>
            <div className="left">
                <div className="coupon-menu">
                    <h3>Coupon</h3>
                    <h3>OFF</h3>
                    <h3>Delete</h3>
                </div>
               
               {
                allCoupons.map((coupon) => <CouponCard key={coupon._id} couponDetail={coupon}/>)
               }
            </div>
        </div>
    )
}

export default Coupon