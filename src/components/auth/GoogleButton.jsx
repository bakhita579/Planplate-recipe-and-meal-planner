import { useState } from "react";
import {  useNavigate } from "react-router";
import { useLocation } from "react-router";
import { loginWithGoogle } from "../../services/authService";
import { getErrorMessages } from "../../utils/AuthErrors";

function GoogleButton() {
    const [error, setError]= useState("")
    const [submitting, setSubmitting]=useState(false)
    const Navigate= useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname ?? "/Discover"

    async function handleClick(){
        setSubmitting(true)
        setError(""

        )
        try {
            await loginWithGoogle()
            Navigate (from, {replace:true})
        } catch (error) {
            if (error.code !== "auth/popup-closed-by-user") {
                setError(getErrorMessages(error));
            }
            console.log(error.code);
            
        }finally{
            setSubmitting(false)
        }
     }
     return(
        <div>
            <button type="button" onClick={handleClick} disabled={submitting} className="w-full py-3.5 px-6 text-base bg-[#e4572e] hover:bg-[#cc4a24] disabled:opacity-60 text-white font-semibold rounded-lg transition duration-100 cursor-pointer font-serif">
                 {submitting ? "opening google ... ": "continue with google "}
            </button>
            {error && <p className="text-red-600 text-xs font-serif mt-2">{error}</p>}
        </div>
     )
    

    
}
export default GoogleButton