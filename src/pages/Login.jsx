import { Link } from "react-router"
import { useState } from "react"


function Login(){
    const [email, setEmail] = useState(" ")
    const [password, setPassword] = useState(" ")
    const  handleSubmit = (e) => { e.preventDefault()};
    
    return(
        <>
        <h2>Log in</h2>
        <div>
         <form onSubmit={handleSubmit}>
            
                <label htmlFor="Email">Email</label>
            <input id="Email" 
            type="email" 
            name="Email" 
            value={email}
            autoComplete="email"
             onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"/>
            <label htmlFor="password">Password</label>
            <input id="password"
            type="password" 
            value={password}
            autoComplete="current-password"
             onChange={(e) => setPassword(e.target.value)}
            placeholder="password"/>
            <button type="submit">Login</button>
            <p>Don't have an account</p>
            <link to = "/Register">Create account</link>

            </form>
            
            </div>

        
        </>
    )
}

export default Login