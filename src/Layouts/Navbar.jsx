import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "../services/authService";

const links = [
    {id: 1, name: "Discover", path: "/"},
    {id: 2, name: "Login", path: "/Login"},
    {id: 3, name: "Register", path: "/Register"},
    {id: 4, name: "Favourite", path: "/Favourite"},
    {id: 5, name: "Planner", path: "/Planner"},
    {id: 6, name: "Shopping-List", path: "/Shopping-List"},
    {id: 7, name: "RecipeDetail", path: "/RecipeDetail"},
    {id: 8, name: "NotFound", path: "*"}
];

function Navbar() {
    const {user, loading} = useAuth()
    const navigate = useNavigate();
    
 

 async function handleLogout(){
    try {
        await signOut()
        navigate ("/")
    } catch (error) {
        console.log(error.code);
        
        
    }
 }

    const handleClick = () => {
        navigate("/Login");
    };

    const [isOpen, setIsOpen] = useState(() => {
        try {
            const saved = localStorage.getItem("isOpen");
            return saved !== null ? JSON.parse(saved) : links;
        } catch (error) {
            return links;
        }
    });
    const pillClass = ({ isActive }) =>
    `px-5 py-2 rounded-full text-sm font-medium transition-colors ${
        isActive
            ? "bg-[#e65322] text-white border border-[#e65322]"
            : "bg-white text-gray-800 border border-gray-300 hover:border-[#e65322] hover:text-[#e65322]"
    }`;

    
        return (
    <header className="w-full flex justify-end items-center px-6 py-4 mb-3">
        <nav aria-label="main">
            <div className="flex flex-wrap items-center gap-3 font-serif">
                <NavLink to="/" end className={pillClass}>Home</NavLink>
                <NavLink to="/Discover" className={pillClass}>Discover</NavLink>
                {!loading && user && (
                    <>
                        <NavLink to="/Favourite" className={pillClass}>Favourite</NavLink>
                        <NavLink to="/Planner" className={pillClass}>Planner</NavLink>
                        <NavLink to="/Shopping-List" className={pillClass}>Shopping List</NavLink>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="px-5 py-2 rounded-full text-sm font-medium bg-[#e65322] text-white hover:bg-[#cf4618] transition-colors cursor-pointer"
                        >
                            Log out
                        </button>
                    </>
                )}
                {!loading && !user && (
                    <>
                        <NavLink to="/Login" className={pillClass}>Login</NavLink>
                        <NavLink to="/Register" className={pillClass}>Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    </header>
);
    
}

export default Navbar;