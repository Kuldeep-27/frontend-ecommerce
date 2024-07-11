
import "./Navbar.scss";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import { BsCartDash } from "react-icons/bs";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../redux/slices/cartSlice";
import { getUserInfo } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
import logo from "../../../public/logo.png";
import { getAllProducts } from "../../redux/slices/productSlice";
import { KEY_ACCESS_TOKEN, getItem, removeItem } from "../../utils/localStorageManager";
import { axiosClient } from "../../utils/axiosClient";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const isLogin = getItem(KEY_ACCESS_TOKEN);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isLogin) {
      dispatch(getUserCart());
      dispatch(getUserInfo());
    }
  }, [isLogin, dispatch]);

  const cartItems = useSelector((store) => store.cartReducer.userItems);
  const userInfo = useSelector((store) => store.userReducer.userInfo);
  const isAdmin = userInfo?.role === "admin";

  const handleLogout = async () => {
    try {
      await axiosClient.get("/auth/logout");
      toast.success("Logged Out Successfully");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/");
      setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/searchItems/${query}`);
    setQuery("");
  };

  return (
    <div className="nav-container">
      <div className="nav-items">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Ecommerce App" />
          </NavLink>
        </div>
        <div className="search-info">
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              id="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">
              <FaSearch className="search-icon" />
            </button>
          </form>
          <div className="items">
            {isLogin ? (
              <div className="info">
                <FaAngleDown onClick={() => setIsOpen(!isOpen)} />
                {isOpen && (
                  <div className="list-items">
                    <NavLink className="link" to="/myOrder">
                      <p className="topItem" onClick={() => setIsOpen(false)}>MY ORDER</p>
                    </NavLink>
                    {isAdmin && (
                      <NavLink className="link" to="/admin/products">
                        <p className="topItem" onClick={() => setIsOpen(false)}>ADMIN</p>
                      </NavLink>
                    )}
                    <p className="topItem" onClick={handleLogout}>LOGOUT</p>
                  </div>
                )}
              </div>
            ) : (
              <NavLink className="link btn" to="/login">
                <h3>Login</h3>
              </NavLink>
            )}
            {isLogin && (
              <div className="cart">
                <NavLink className="link" to="/cart">
                  <BsCartDash className="cart-icon" />
                </NavLink>
                <h3>{cartItems?.items?.length || 0}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
