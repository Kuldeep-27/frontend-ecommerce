import { NavLink } from "react-router-dom";

import ProductCard from "../productCard/ProductCard";
import "./Body.scss"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getLatestProduct } from "../../redux/slices/productSlice";
import Shimmer from "../Shimmer/Shimmer";
import Banner from "../banner/Banner";

const Body = () => {
  const dispatch = useDispatch();
  

  useEffect(()=>{
    dispatch(getLatestProduct());
    

  },[])

  const latestProduct = useSelector((store) => store.productReducer.latestProduct);
  


  return (
    <div className="body-container">
       <Banner/>
      <div
        className="latest-container"
        
      >
        
        <h1>Latest Products</h1>
        <NavLink className="link" to="/allProducts"><button className="btn">More</button></NavLink>
      </div>
      <div className="products">
        {
          latestProduct ? latestProduct.map((product) => <ProductCard key={product._id} product={product}/>)
          : <Shimmer/>
        }
      </div>
    </div>
  );
};

export default Body;
