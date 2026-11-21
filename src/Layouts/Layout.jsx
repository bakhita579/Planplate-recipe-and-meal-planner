import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
    return(
        <>
        <Outlet />
        <Navbar/>
        <Footer />
        </>
    )
    
}
export default Layout