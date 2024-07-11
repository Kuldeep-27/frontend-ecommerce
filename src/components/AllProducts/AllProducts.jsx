import React, { useEffect, useState } from 'react'
import ProductCard from '../productCard/ProductCard'
import "./AllProducts.scss"
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/slices/productSlice';

function AllProducts() {
   
    const [filterProductList,setFilterProductList] = useState(null);
   
   // const dispatch = useDispatch();

    const allProducts = useSelector((store) => store.productReducer.allProducts);

    
      
    //   useEffect(()=>{
    //     dispatch(getAllProducts());
  
    // },[])
      
    

    useEffect(()=>{
        
       
        setFilterProductList(allProducts);
    },[allProducts])

  const handleChange = (e) => {
    console.log(e.target.value);
    const val = e.target.value;

    if(val === "none")
      setFilterProductList(filterProductList);
    else if(val === "increasing")
    {
        const newProducts = [...filterProductList];

        newProducts.sort((a,b)=> a.price - b.price);
        setFilterProductList(newProducts);
    }
    else
    {
        const newProducts = [...filterProductList];

        newProducts.sort((a,b)=> b.price - a.price);
        setFilterProductList(newProducts);
    }


     


  }

  const handleCategory = (e) => {
    
    const val = e.target.value;

    if(val === "all")
      setFilterProductList(allProducts);
   
    else{

        const newProducts = allProducts.filter((product)=>product.category.toLowerCase() === val);
        setFilterProductList(newProducts);

    }





  }
 

    
  return (
    <div className="all-product-container container">
        <div className="filters">
            <h2>Filters</h2>
            <div className="price">
                <label htmlFor="sort">Sort</label>
                <select className="input-box" name="" id="sort"   onClick={handleChange} >
                    <option value="none">None</option>
                    <option value="increasing">Low to High Price</option>
                    <option value="decreasing">High To Low Price</option>
                </select>

            </div>

            <div className="category">
                <label htmlFor="cat">Category</label>
                <select className="input-box" name="" id="cat" onChange = {handleCategory}>
                    <option value="all">All</option>
                    <option value="mobile">Mobile</option>
                    <option value="computer">Computer</option>
                    <option value="men">Men</option>
                    <option value="camera">Camera</option>
                    <option value="shoes">Shoes</option>
                    <option value="woman">Woman</option>
                    <option value="other">Other</option>
                </select>
            </div>
             
        </div>
        <div className="products">
          <div className="product-items">
          {
             filterProductList && filterProductList.map((product) => <ProductCard key={product._id} product={product}/>)
           }

          </div>
          

        </div>
    </div>

  )
}

export default AllProducts