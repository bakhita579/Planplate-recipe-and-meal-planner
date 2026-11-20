import { Link } from "react-router"
import { useState } from "react"


function Login(){
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
        <div className="Login-container min-h-screen flex items-center justify-center bg-blue-200 px-3">
         <form onSubmit ={handleSubmit} className="max-w-full bg-white p-6 rounded-2xl border border-black space-y-4">
            <h2 className="text-black text-2xl font-bold text-center font-serif">Login</h2>
            <div className="flex flex-col space-y-3">
                <label htmlFor="Email" className="text-sm font-bold  text-black font-serif">Email</label>
            <input id="Email" 
            type="email" 
            name="Email" 
            value={email}
            autoComplete="email"
             onChange={(e) => setEmail(e.target.value)}
             placeholder="you@example.com" className="w-full px-3 py-3 border border-black rounded-lg font-serif "/>
             </div>
            <div className="flex flex-col space-y-3">
            <label htmlFor="password" className="text-sm  text-black font-serif font-bold"> Password</label>
            <input id="password"
            type="password" 
            value={password}
            autoComplete="current-password"
             onChange={(e) => setPassword(e.target.value)}
             placeholder=".........." className="w-full px-3 py-3 border border-black rounded-lg font-serif "
            />
            </div>

            <button type="submit" className="bg-blue-700 w-full hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-100 cursor-pointer font-serif">Login</button>
            <div className="text-center pt-1.5">
            <p className="text-xs italic font-bold text-black font-serif">Don't have an account</p>
            <Link className="font-bold text-black uppercase text-xs hover:underline font-serif" to = "/Register">Create account</Link>
               </div>
            </form>
            
            </div>

        
        
    )
}

export default Login