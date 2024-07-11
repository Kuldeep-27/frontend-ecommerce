import { useState } from "react";
import "./UpdateProduct.scss"
import { useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../../redux/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getUserCart } from "../../redux/slices/cartSlice";

const UpdateProduct = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [stock,setStock] = useState("");
    const [category,setCategory] = useState("");
    const [image,setImage] = useState("");
    const [description,setDescription] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    
    const productId=params.productId;

    const dispatch = useDispatch();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

       await  dispatch(updateProduct({
            name,
            price,
            stock,
            description,
            category,
            image,
            productId
        }));

        await dispatch(getUserCart());

        navigate("/admin/products");


      

    }

    const handleDeleteProduct = async () => {
       await dispatch(deleteProduct({productId}))
        navigate("/admin/products");
    }

    return (
        <div className="update-product-container">
            <div className="manage">
           
            <button className="btn delete" onClick={handleDeleteProduct}>Delete Product</button>
            </div>

            <h2>Manage Products</h2>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input className="input-box" type="text" id="name" onChange = {(e)=>setName(e.target.value)} />

                <label htmlFor="price">Price</label>
                <input className="input-box" type="text" id="price" onChange={(e)=>setPrice(e.target.value)} />

                <label htmlFor="stock">Stock</label>
                <input className="input-box" type="text" id="stock" onChange ={(e)=>setStock(e.target.value)} />

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
                <input className="input-box" type="text" id="desc" onChange={(e)=>setDescription(e.target.value)} />

                <label htmlFor="photo">Image</label>
                <input className="input-box" type="file" id="photo" onChange={handleImageChange} />

                <input className="btn" type="submit" value="Submit" />
            </form>

            

        </div>
    )
}

export default UpdateProduct;