import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export function useAuth (){
    const context = useContext(AuthContext)
    if (context === null){
        throw new Error("auth must be hidden by the provider");
        
    }
    return(context)
}