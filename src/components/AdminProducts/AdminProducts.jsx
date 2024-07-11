import React, { useEffect } from 'react'
import "./AdminProducts.scss"
import AdminProductCard from '../AdminProductCard/AdminProductCard'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../redux/slices/productSlice'

function AdminProducts() {

  const dispatch = useDispatch();
  const allProducts = useSelector((store) => store.productReducer.allProducts);

 

  // useEffect(()=>{
  //     dispatch(getAllProducts());

  // },[])

  return (
    <div className="admin-product-container">

      <div className="index">
        <p></p>
        <h2>Products</h2>
        <NavLink to="/newProduct"><button>+</button></NavLink>
      </div>

      <div className="headings">
        <h3>Photo</h3>
        <h3>Name</h3>
        <h3>Price</h3>
        <h3>Stock</h3>
        <h3>Action</h3>
      </div>

      <div className="content">
        {
          allProducts && allProducts.map((product) => <AdminProductCard key={product._id} product={product}/>)
        }
        
      </div>
       
        
    </div>
  )
}

export default AdminProducts