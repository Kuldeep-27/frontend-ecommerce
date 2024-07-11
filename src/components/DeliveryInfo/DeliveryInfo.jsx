import { useEffect, useState } from "react";
import "./DeliveryInfo.scss"
import { useDispatch, useSelector } from "react-redux";
import { getDeliveryInfo, saveDeliveryInfo } from "../../redux/slices/deliveryInfo";
import { useNavigate, useParams } from "react-router-dom";
import { placeOrder } from "../../redux/slices/orderSlice";
import { getUserCart } from "../../redux/slices/cartSlice";

const DeliveryInfo = () => {

    const deliveryInfo = useSelector((store)=>store.deliveryInfoReducer.deliveryInfo);

    
    console.log(deliveryInfo);

    const [address,setAddress] = useState();
    const [city,setCity] = useState();
    const [state,setState] = useState();
    const [country,setCountry] = useState();
    const [pincode,setPincode] = useState();

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDeliveryInfo());
    },[])

    useEffect(()=>{
        setAddress(deliveryInfo.address)
        setCity(deliveryInfo.city)
        setState(deliveryInfo.state)
        setCountry(deliveryInfo.country)
        setPincode(deliveryInfo.pincode)

    },[deliveryInfo])

    const params = useParams();
    const discount = parseInt(params.discount);
    const navigate = useNavigate();
   


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(saveDeliveryInfo({
            address,
            city,
            state,
            country,
            pincode
        }));
       

    }

    const handlePayment = async () => {
      await dispatch(placeOrder({discount}));
      await dispatch(getUserCart());

      navigate("/");
    }

    return (
        <div className="delivery-info">
            <h2>Shipping Address</h2>
             <form onSubmit={handleSubmit}>
                <input className="input-box" type="text" value={address}  placeholder="Address" onChange={(e)=>setAddress(e.target.value)} />
                <input className="input-box" type="text" value={city}  placeholder="City" onChange={(e)=>setCity(e.target.value)} />
                <input className="input-box" type="text" value={state} placeholder="State" onChange={(e)=>setState(e.target.value)} />
                <input className="input-box" type="text" value={country} placeholder="Country" onChange={(e)=>setCountry(e.target.value)} />
                <input className="input-box" type="text" value={pincode} placeholder="Pin Code"onChange={(e)=>setPincode(e.target.value)} />
                <input className="btn" type="submit" value="Save Address" />
             </form>
             <button className="btn" onClick={handlePayment}>PAY NOW</button>
        </div>
    )
}

export default DeliveryInfo;