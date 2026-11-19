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
        <div className="Reg-container">
            <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="text-red-600">{error}</p>}

        <label htmlFor="email">Email</label>
        <input id="Email" 
            type="email" 
            name="Email" 
            value={email}
            autoComplete="email"
             onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">password</label>
        <input id="password" 
            type="password" 
            name="password" 
            value={password}
            autoComplete="password"
             onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">sign up </button>
            <p className="italic font-bold text-xs text-red-700">create account</p>
            <Link className="font-bold uppercase text-xs text-red-900" to="/Login">Log in</Link>
        </form>
        </div>
       
        
    )
}
    

export default Register;