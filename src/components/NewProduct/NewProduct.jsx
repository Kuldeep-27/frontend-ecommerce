import { useState } from "react";
import "./NewProduct.scss"

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../../redux/slices/productSlice";

const NewProduct = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [stock,setStock] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [image,setImage] = useState("");

   const navigate = useNavigate();
   const dispatch = useDispatch();

 
    

    const handleSubmit = async (e) => {
        e.preventDefault();
       await dispatch(addNewProduct({
            name,
            price,
            stock,
            description,
            category,
            image

        }))
        
        navigate("/admin/products");
      
       
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          if (fileReader.readyState === fileReader.DONE) {
            setImage(fileReader.result);
            
          }
        };

    }

    return (
        <div className="new-product-container">
            <h2>New Product</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input className="input-box" type="text" id="name" onChange={(e)=>setName(e.target.value)} />

                <label htmlFor="price">Price</label>
                <input className="input-box" type="text" id="price" onChange={(e)=>setPrice(e.target.value)} />

                <label htmlFor="stock">Stock</label>
                <input className="input-box" type="text" id="stock" onChange={(e)=>setStock(e.target.value)} />

                <label htmlFor="category">Category</label>
                 <select name="" id="category" onChange={(e)=>setCategory(e.target.value)}>
                    <option value=""></option>
                    <option value="Mobile">Mobile</option>
                    <option value="Computer">Computer</option>
                    <option value="Men">Men</option>
                    <option value="Camera">Camera</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Woman">Woman</option>
                    <option value="Other">Other</option>
                  
                 </select>
               

                <label htmlFor="desc">Description</label>
                <textarea name="" id="desc" cols="10" rows="10" onChange={(e)=>setDescription(e.target.value)}></textarea>

                <label htmlFor="photo">Image</label>
                <input className="input-box" type="file" id="photo" onChange={handleImageChange} />

                <input className="btn" type="submit" value="Submit" />
            </form>

        </div>
    )
}

export default NewProduct;