import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import MyOrder from "./components/MyOrder/MyOrder";
import AdminProducts from "./components/AdminProducts/AdminProducts";
import Body from "./components/Body/Body";
import Cart from "./components/Cart/Cart";
import AllProducts from "./components/AllProducts/AllProducts";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import OnlyIfAdmin from "./components/OnlyIfAdmin/OnlyIfAdmin";
import AdminMenu from "./components/AdminMenu/AdminMenu";
import AdminCustomer from "./components/AdminCustomer/AdminCustomer";
import AdminTransaction from "./components/AdminTransaction/AdminTransaction";
import NewProduct from "./components/NewProduct/NewProduct";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import IsLoggedIn from "./components/IsLoggedIn/IsLoggedIn";
import Coupon from "./components/Coupon/Coupon";
import DeliveryInfo from "./components/DeliveryInfo/DeliveryInfo";
import OrderDetails from "./components/TransactionCard/OrderDetails";
import DetailPage from "./components/MyOrder/DetailPage/DetailPage";
import {Toaster} from "react-hot-toast";
import Search from "./components/Search/Search";



const App = () => {
  return (
    <div style={{marginTop:"12vh"}}>

      <Toaster/>
    
      <Navbar/>
     
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
       
       
        <Route path="/" element={<Body/>}/>
       
        <Route path="/allProducts" element={<AllProducts/>}/>
        <Route path="/productDetail/:productId" element={<ProductDetail/>}/>
        <Route path="/searchItems/:query" element={<Search/>}/>

        <Route element={<IsLoggedIn/>}>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/myOrder" element={<MyOrder/>}/>
        <Route path="/shipping-info/:discount" element={<DeliveryInfo/>}/>
        <Route path="/orderDetail/:orderId" element={<DetailPage/>}/>

        </Route>
      

        <Route element={<OnlyIfAdmin/>}>
          <Route element = {<AdminMenu/>}>
          <Route path="admin/products" element={<AdminProducts/>}/>
          <Route path ="admin/customers" element = {<AdminCustomer/>}/>
          <Route path = "admin/transaction" element = {<AdminTransaction/>}/>
          <Route path = "admin/coupon" element = {<Coupon/>}/>

          </Route>
          <Route path = "/admin/orderDetails/:userId/:orderId" element={<OrderDetails/>}/>
          <Route path="newProduct" element={<NewProduct/>}/>
          <Route path="updateProduct/:productId" element={<UpdateProduct/>}/>
        </Route>

        
       
       



       
      </Routes>
     

      <Footer/>
     
    </div>
  )
}

export default App;