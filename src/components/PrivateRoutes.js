import {Navigate, Outlet} from 'react-router-dom'
import {Cookies} from "react-cookie";


const cookies = new Cookies();
const PrivateRoutes = () => {
    let auth = {'token': false};
    let token = cookies.get("token");
    if (token !== 'undefined' && token !== undefined) {
        auth = {'token': true};
    }

    console.log(auth);

    return (
        auth.token ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes;