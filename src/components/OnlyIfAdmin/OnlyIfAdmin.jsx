import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";


const OnlyIfAdmin = () => {
    
    const user = useSelector((store) => store.userReducer.userInfo);
    const isAdmin = user?.role === "admin"

    return (
       <>
       {
         isAdmin && <Outlet/>
       }
       </>
    )
}

export default OnlyIfAdmin;