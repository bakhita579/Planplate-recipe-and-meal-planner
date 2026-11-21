import { Navigate } from "react-router";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";

function protectedRoute() {
    const {user, loading} = useAuth()
    const location = useLocation()
    if (loading){
        return <p role="status">Checking your session ....</p>
    }
    if (! user){
        return <Navigate to = "/Login"
        replace state={{from: location}}/>
    }
    
       return <Outlet />
    
    
}
export default protectedRoute