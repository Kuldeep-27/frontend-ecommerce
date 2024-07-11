import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, getItem } from "../../utils/localStorageManager";


const IsLoggedIn = () => {
    const user = getItem(KEY_ACCESS_TOKEN);
    
   
    return (
        <>
         {user ? <Outlet/> : <Navigate to="/login"/>}
        </>
    )
}

export default IsLoggedIn;