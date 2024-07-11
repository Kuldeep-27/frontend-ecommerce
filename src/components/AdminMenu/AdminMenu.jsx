import { NavLink, Outlet } from "react-router-dom";
import "./AdminMenu.scss"
import { useState } from "react";

const AdminMenu = () => {
    const [menu,setMenu] = useState("Product");

    const getNavLinkStyle = (menuItem) => {
      return menu === menuItem ? { backgroundColor:"darkgreen" } : {};
    };

    return (
        <div className="admin-menu-container">
           <div className="menu">
             <h2>DashBoard</h2>
             <NavLink  style={getNavLinkStyle("Product")} onClick={() => setMenu("Product")} className="link btn link1" to="/admin/products">Product</NavLink>
             <NavLink  style={getNavLinkStyle("Customer")} onClick={() => setMenu("Customer")} className="link btn link1" to="/admin/customers">Customer</NavLink>
             <NavLink  style={getNavLinkStyle("Transaction")} onClick={() => setMenu("Transaction")} className="link btn link1" to="/admin/transaction">Transaction</NavLink>
             <NavLink  style={getNavLinkStyle("Coupon")} onClick={() => setMenu("Coupon")} className="link btn link1" to="/admin/coupon">Coupon</NavLink>
           </div>
           <div className="outlet">
           <Outlet/>
           </div>
           
        </div>
    )
}

export default AdminMenu;