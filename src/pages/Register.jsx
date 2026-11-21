import { useState } from "react"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import { registerUser } from "../services/authService"
import { validateRegisterForm } from "../utils/Validators"
import { hasErrors } from "../utils/Validators"
import { getErrorMessages } from "../utils/AuthErrors"
import GoogleButton from "../components/auth/GoogleButton"

function Register() {
    const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [error, setError] = useState({})
        const [confirmPassword, setConfirmPassword] = useState("")
        const [formError, setFormError] = useState("")
        const [submitting, setSubmitting] = useState(false)
        const [success, setSuccess] = useState(false)
        const navigate = useNavigate()
    
        async function handleSubmit(event) {
                event.preventDefault()
                const validateErrors = validateRegisterForm({email, password, confirmPassword})
                setError(validateErrors)
    
        if (hasErrors (validateErrors)){
                
                return 
        }
                setSubmitting(true)
                setFormError("")
            
            try {
                await registerUser(email.trim(),password) 
                navigate("/Discover")
                setSuccess(true)
            } catch (error) {
                setFormError(getErrorMessages(error))
                console.log(error.code);
                
            }finally{
                setSubmitting(false)
            }
        
    }
    return(
        <div className="Reg-container min-h-screen flex items-center justify-center bg-blue-200 px-3">
          <form onSubmit={handleSubmit} className="max-w-full bg-white p-6 rounded-2xl border border-black space-y-4">
            <h2 className="text-black text-2xl font-bold text-center font-serif">SignUp</h2>
            
        {formError && <p className="text-red-600 font-serif">{formError}</p>}
         <div className="flex flex-col space-y-3">
        <label htmlFor="email" className="text-sm font-bold text-black font-serif">Email</label>
        <input id="email" 
            type="email" 
            name="email" 
            value={email}
            autoComplete="email"
             onChange={(e) => setEmail(e.target.value)}
             aria-invalid = {Boolean(error.email)}
             aria-describedby={error.email ? "email-error" : undefined}
             placeholder="you@example.com" className="w-full px-3 py-3 border border-black rounded-lg font-serif"
            />
            {error.email && <p id="email-error" className="text-red-600 text-xs font-serif">{error.email}</p>}
            </div>
            <div className="flex flex-col space-y-3">
            <label htmlFor="password" className="text-sm font-bold text-black font-serif">password</label>
        <input id="password" 
            type="password" 
            name="password" 
            value={password}
            autoComplete="new-password"
             onChange={(e) => setPassword(e.target.value)}
             aria-invalid = {Boolean(error.password)}
             aria-describedby={error.password ? "password-error" : undefined}
            placeholder="......" className="w-full px-3 py-3 border border-black rounded-lg font-serif"/>
            {error.password && <p id="password-error" className="text-red-600 text-xs font-serif">{error.password}</p>}
            </div>
            <div className="flex flex-col space-y-3">
    <label htmlFor="confirmPassword" className="text-sm font-bold text-black font-serif">Confirm Password</label>
    <input
        id="confirmPassword"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        autoComplete="new-password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        aria-invalid={Boolean(error.confirmPassword)}
        aria-describedby={error.confirmPassword ? "confirm-password-error" : undefined}
        placeholder=".........."
        className="w-full px-3 py-3 border border-black rounded-lg font-serif"
    />
    {error.confirmPassword && <p id="confirm-password-error" className="text-red-600 text-xs font-serif">{error.confirmPassword}</p>}
</div>
            
            <button type="submit" disabled={submitting} className="bg-blue-700 w-full hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-100 cursor-pointer font-serif">
    {submitting ? "creating account ... " : "Register "}
</button>
            
                 <div className="text-center pt-1.5 space-y-2">
            <p className="text-sm text-gray-500 font-serif">or</p>
            <GoogleButton />
            <p className="text-l italic font-bold text-black font-serif ">Already have an account?</p>
            <Link className="font-bold text-black uppercase text-l hover:underline font-serif" to="/Login">Log in</Link>
            </div>
        </form>
        </div>
       
        
    )
}
    

export default Register;