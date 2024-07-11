import { useEffect } from "react";
import "./ProductDetail.scss"
import { useDispatch, useSelector } from "react-redux";
import { getProductInfo } from "../../redux/slices/productSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";
import ProductCard from "../productCard/ProductCard";
const ProductDetail = () => {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(()=>{
        dispatch(getProductInfo({productId:params.productId}));
    },[params.productId])

    const productInfo = useSelector((store) => store.productReducer.productInfo);
    const allProducts = useSelector((store) => store.productReducer.allProducts);
    const similarProducts = allProducts.filter((product)=> (product.category.toLowerCase() === productInfo?.category.toLowerCase()) && (product._id !== productInfo?._id))

    

    const handleAddToCart = async () => {
        
        dispatch(addToCart({ productId:params.productId}))
   }

    if(!productInfo){
        return <h2>No Product Found</h2>
    }

    

    return (
        <div className="product-detail-container">
            <h1>Product Detail</h1>
            <div className="contain">

           
            <div className="image-section">
                <img src={productInfo.image.url} alt="" />
            </div>
            <div className="detail-section">
                <h2>{productInfo.name}</h2>
                <p id="desc">Description: {productInfo.description}</p>
                <h3>Rs: <span>₹{productInfo.price}</span> </h3>
              
                <button className="btn" onClick={handleAddToCart}>ADD TO CART</button>


            </div>
            </div>

            <div className="similar">
                {
                    similarProducts.length > 0 && (
                        <>
                         <h2>Similar Product</h2>
                         <div className="sim-product">
                         { similarProducts.map((product) => <ProductCard key={product._id} product={product}/>)}
                         </div>
                       

                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ProductDetail;