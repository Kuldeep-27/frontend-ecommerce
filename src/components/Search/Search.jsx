import { useParams } from "react-router-dom";
import "./Search.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProducts } from "../../redux/slices/productSlice";
import { useEffect } from "react";
import ProductCard from "../productCard/ProductCard";


const Search = () => {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getSearchProducts({query:params.query}));
    },[params.query]);

    const searchItems = useSelector((store) => store.productReducer.searchProducts);

     
    if(searchItems.length === 0)
    return <h2 style={{display:"flex",justifyContent:"center",alignItems:"center",height:"40vh"}}>No Product Found</h2>


    return (
        <div className="search-container">
            <div className="search-heading">
                <h2>{searchItems.length} Items Found</h2>
            </div>
            <div className="search-list">
            {
                searchItems.map((product) => <ProductCard key={product._id} product={product}/>)
            }

            </div>
            
        </div>
    )
}

export default Search;