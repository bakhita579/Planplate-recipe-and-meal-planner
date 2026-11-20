import { useState } from "react"
import { Link } from "react-router"

function Register() {
    const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [error, setError] = useState("")
    
        const  handleSubmit = (e) => { e.preventDefault();
    
        if (! email || ! password){
            setError("Enter email and password")
            return
        }
        setError("")
        console.log('submitting', {email, password});
    }
    return(
        <div className="Reg-container min-h-screen flex items-center justify-center bg-blue-200 px-3">
          <form onSubmit={handleSubmit} className="max-w-full bg-white p-6 rounded-2xl border border-black space-y-4">
            <h2 className="text-black text-2xl font-bold text-center font-serif">SignUp</h2>
        {error && <p className="text-red-600 font-serif">{error}</p>}
         <div className="flex flex-col space-y-3">
        <label htmlFor="email" className="text-sm font-bold text-black font-serif">Email</label>
        <input id="Email" 
            type="email" 
            name="Email" 
            value={email}
            autoComplete="email"
             onChange={(e) => setEmail(e.target.value)}
             placeholder="you@example.com" className="w-full px-3 py-3 border border-black rounded-lg font-serif"
            />
            </div>
            <div className="flex flex-col space-y-3">
            <label htmlFor="password" className="text-sm font-bold text-black font-serif">password</label>
        <input id="password" 
            type="password" 
            name="password" 
            value={password}
            autoComplete="password"
             onChange={(e) => setPassword(e.target.value)}
            placeholder="you@example.com" className="w-full px-3 py-3 border border-black rounded-lg font-serif"/>
            </div>
            
            <button type="submit" className="bg-blue-700 w-full hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-100 cursor-pointer font-serif">sign up </button>
            <div>
            <p className="text-l italic font-bold text-black font-serif ">create account</p>
            <Link className="font-bold text-black uppercase text-l hover:underline font-serif" to="/Login">Log in</Link>
            </div>
        </form>
        </div>
       
        
    )
}
    

export default Register;