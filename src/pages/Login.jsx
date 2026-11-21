import { Link } from "react-router"
import { useState } from "react"
import { useLocation } from "react-router"
import { useNavigate } from "react-router"
import { getErrorMessages } from "../utils/AuthErrors"
import { registerUser } from "../services/authService"
import { logIn } from "../services/authService"
import { hasErrors, validateLoginForm } from "../utils/Validators"
import GoogleButton from "../components/auth/GoogleButton"


function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({})
    const [formError,setFormError] = useState("")
    const [submitting,setSubmitting] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname ?? '/Discover'
    

    async function handleSubmit(event) {
        event.preventDefault()
        const validateErrors = validateLoginForm({email, password})
        setError(validateErrors)

    if (hasErrors (validateErrors)){
         return 
    }
       
        setSubmitting(true)
        setFormError("")
        
    
    try {
        await logIn(email.trim(),password) 
        navigate(from,{replace:true})
    } catch (error) {
        setFormError(getErrorMessages(error))
        console.log(error.code);
        
        
    }finally{
        setSubmitting(false)
    }
}
    
    return(
        <div className="Login-container min-h-screen flex items-center justify-center bg-blue-200 px-3">
         <form onSubmit ={handleSubmit}  className="max-w-full bg-white p-6 rounded-2xl border border-black space-y-4">
            <h2 className="text-black text-2xl font-bold text-center font-serif">Login </h2>
            {formError && <p className="text-red-600 font-serif">{formError}</p>}
            <div className="flex flex-col space-y-3">
                <label htmlFor="Email" className="text-sm font-bold  text-black font-serif">Email</label>
            <input id="Email" 
            type="email" 
            name="Email" 
            value={email}
            autoComplete="email"
             onChange={(e) => setEmail(e.target.value)}
             aria-invalid = {Boolean(error.email)}
             aria-describedby={error.email ? "email-error" : undefined}
             placeholder="you@example.com" className="w-full px-3 py-3 border border-black rounded-lg font-serif "/>
             {error.email && <p id="email-error" className="text-red-600 text-xs font-serif">{error.email}</p>}
             </div>
            <div className="flex flex-col space-y-3">
            <label htmlFor="password" className="text-sm  text-black font-serif font-bold"> Password</label>
            <input id="password"
            type="password" 
            value={password}
            autoComplete="current-password"
             onChange={(e) => setPassword(e.target.value)}
             aria-invalid = {Boolean(error.password)}
             aria-describedby={error.password ? "password-error" : undefined}
             placeholder=".........." className="w-full px-3 py-3 border border-black rounded-lg font-serif "
            />
            {error.password && <p id="password-error" className="text-red-600 text-xs font-serif">{error.password}</p>}
            </div>

            <button type="submit" disabled={submitting} className="bg-blue-700 w-full hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-100 cursor-pointer font-serif">
                {submitting ? "logging ... ": "log in "}
            </button>
            <div className="text-center pt-1.5">
            
               </div>
               <div className="text-center pt-1.5 space-y-2">
            <p className="text-sm text-gray-500 font-serif">or</p>
            <GoogleButton />

            <p className="text-xs italic font-bold text-black font-serif">Don't have an account</p>
            <Link className="font-bold text-black uppercase text-xs hover:underline font-serif" to = "/Register">Create account</Link>
            </div>
            </form>  
            </div>

        
        
    )
}

export default Login