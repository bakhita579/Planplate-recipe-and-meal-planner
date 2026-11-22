import { Link } from "react-router"
import { useState } from "react"
import { useLocation } from "react-router"
import { useNavigate } from "react-router"
import { getErrorMessages } from "../utils/AuthErrors"
import { registerUser } from "../services/authService"
import { logIn } from "../services/authService"
import { hasErrors, validateLoginForm } from "../utils/Validators"
import GoogleButton from "../components/auth/GoogleButton"

const ERRORS = {
    "auth/invalid-credential": "Wrong email or password",
    "auth/invalid-email": "Enter a valid email address",
    "auth/too-many-requests": "Too many attempts. Please try again later",
    "auth/network-request-failed": "Network error. Please check your connection",
}

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
         <form onSubmit ={handleSubmit}  className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-3xl border border-black space-y-6 shadow-md">
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

            <button
  type="submit"
  disabled={submitting}
  className="w-full py-3.5 px-6 text-base bg-[#e4572e] hover:bg-[#cc4a24] disabled:opacity-60 text-white font-semibold rounded-lg transition duration-100 cursor-pointer font-serif"
>
  {submitting ? "Logging in..." : "Log in"}
</button>

<div className="text-center pt-1.5 space-y-3">
  <p className="text-sm text-gray-500 font-serif">or</p>

  <GoogleButton style={{ width: "100%", height: "48px", fontSize: "16px" }} />

  <p className="text-xs italic font-bold text-black font-serif pt-2">
    Don't have an account?
  </p>
  <Link
    to="/Register"
    className="block w-full py-3.5 px-6 text-base bg-[#e4572e] hover:bg-[#cc4a24] text-white font-semibold uppercase tracking-wide rounded-lg transition duration-100 font-serif"
  >
    Create account
  </Link>
</div>
            </form>  
            </div>

        
        
    )
}

export default Login