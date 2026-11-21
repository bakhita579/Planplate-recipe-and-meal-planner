import { useState } from "react";
import { replace, useNavigate } from "react-router";
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
            setError(getErrorMessages(error))
            console.log(error.code);  
        }finally{
            setSubmitting(false)
        }
     }
     return(
        <div>
            <button type="button" onClick={handleClick} disabled={submitting}>
                 {submitting ? "openning google ... ": "continue with google "}
            </button>
        </div>
     )
    

    
}
export default GoogleButton