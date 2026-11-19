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
        <div className="Login-container">
         <form onSubmit={handleSubmit}>
            <h2 className="text-red-700">Log in</h2>
            
                <label htmlFor="Email">Email</label>
            <input id="Email" 
            type="email" 
            name="Email" 
            value={email}
            autoComplete="email"
             onChange={(e) => setEmail(e.target.value)} />
            
            <label htmlFor="password">Password</label>
            <input id="password"
            type="password" 
            value={password}
            autoComplete="current-password"
             onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-blue-700" type="submit">Login</button>
            <p className="text-xs italic font-bold">Don't have an account</p>
            <Link className="font-bold text-red-950 uppercase text-xs" to = "/Register">Create account</Link>

            </form>
            
            </div>

        
        
    )
}

export default Login