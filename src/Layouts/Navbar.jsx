import { useState } from "react";
import { Link } from "react-router";

const links = [
    {id: 1, name: "Discover", path: "/"},
    {id: 2, name: "Login", path: "/Login"},
    {id: 3, name: "Register", path: "/Register"},
    {id: 4, name: "Favourite", path: "/Favourite"},
    {id: 5, name: "Planner", path: "/Planner"},
    {id: 6, name: "Shopping-List", path: "/Shopping-List"}
];

function Navbar() {
    const [isOpen, setIsOpen] = useState(() => {
        try {
            const saved = localStorage.getItem("isOpen");
            return saved !== null ? JSON.parse(saved) : links;
        } catch (error) {
            return links;
        }
    });

    return (
        <header>
            <nav aria-label="main">
                <Link to="/">Home</Link>
                <button onClick={() => handleClick(Link.id)}></button>
                <ul>
                    {links.map((link) => (
                        <li key={link.id}>
                            <Link to={link.path}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;