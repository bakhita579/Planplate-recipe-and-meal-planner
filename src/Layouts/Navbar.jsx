import { useState } from "react";
import { Link, useNavigate } from "react-router";
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

    return (
        <header className="flex justify-between items-center mb-3">
             <nav className="flex items-center justify-between px-2 py-2 border-b">
                <div className="flex items-center gap-3 font-serif cursor-pointer">
                    <Link to = "/">Home</Link>
                    <Link to = "/Discover">Discover</Link>
                    {! loading &&  user && (
                        <>
                    <Link to = "/Favourite">Favourite</Link>
                    <Link to = "/Planner">planner</Link>
                    <Link to = "/Shopping-List">Shopping List</Link>
                    <button type="button" onClick={handleLogout}>Log out</button>
                    </>
                    )}
                    {! loading && !user && (
                        <>
                    <Link to = "/Login">Login</Link>
                    <Link to = "/Register">Register</Link>
                    </>
                    )}
                </div>
            </nav>
           
        </header>
    );
}

export default Navbar;