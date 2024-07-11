import "./Navbar.scss";

import { FaAngleDown } from "react-icons/fa";
import { BsCartDash } from "react-icons/bs";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, getItem, removeItem } from "../../utils/localStorageManager";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../redux/slices/cartSlice";
import { getUserInfo } from "../../redux/slices/userSlice";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import logo from "../../../public/logo.png";
import { getAllProducts } from "../../redux/slices/productSlice";

const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false);
    const [query,setQuery] = useState("");
    const isLogin = getItem(KEY_ACCESS_TOKEN);

    const navigate = useNavigate();

    const dispatch = useDispatch();

  
   useEffect(()=>{
    dispatch(getAllProducts());
   },[])
  

    useEffect(()=>{
      isLogin  && dispatch(getUserCart());
      isLogin &&  dispatch(getUserInfo());
    
    },[isLogin])

   

    const cartItems = useSelector((store) => store.cartReducer.userItems);
  
    

    const handleLogout = async () => {

      try{
        const response = await axiosClient.get("/auth/logout");
        toast.success("Logged Out Successfully");

        removeItem(KEY_ACCESS_TOKEN);
        navigate("/")
        console.log(response);

      } catch(e){
        
      }
       setIsOpen(false);

    }

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      navigate(`/searchItems/${query}`);
      setQuery("");
     
    }

    const userInfo = useSelector((store) => store.userReducer.userInfo);
    const isAdmin = (userInfo?.role === "admin") ? true : false;




  return (
    <div className="nav-container">
      <div className="nav-items">
        <div className="logo">
          {/* <h1>Ecommerce App</h1> */}
          <NavLink to="/"><img src={logo} alt="" /></NavLink>
        </div>
        <div className="search-info">
          <form className="search-bar" onSubmit = {handleSearchSubmit}>
            <input type="text" id="text" placeholder="Search" value={query} onChange={(e)=>setQuery(e.target.value)} />
            <button><FaSearch className="search-icon" /></button>
          
           
          </form>
          <div className="items">
           
            {
              isLogin ? (
            <div className="info" >
             
              <FaAngleDown onClick={()=>setIsOpen(!isOpen)} />
              {
                isOpen &&
              <div className="list-items">
                <NavLink className="link link1" to="/myOrder"><p className="topItem" onClick={()=>setIsOpen(false)}>MY ORDER</p></NavLink>
                {isAdmin && <NavLink className="link link1" to="/admin/products"><p  className="topItem" onClick={()=>setIsOpen(false)}>ADMIN</p></NavLink>}
                <p className="topItem" onClick={handleLogout}>LOGOUT</p>
              </div>
              }
            </div>) :  (<NavLink className="link btn" style={{color:"white"}} to="/login"><h3>Login</h3></NavLink>)
           
            }
            <div className="cart">
             {isLogin && <NavLink className="link" to="/cart"><BsCartDash style={{color:"white"}} /></NavLink>}
             {isLogin && <h3>{(cartItems && cartItems.items)? cartItems.items.length : 0}</h3>}
          
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
