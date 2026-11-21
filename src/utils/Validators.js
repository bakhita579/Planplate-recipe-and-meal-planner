

export function validateEmail(email){
    const trimed = email.trim()
    if (trimed ==="") return "Email is required"
    if (! trimed.includes("@")) return "Enter valid email"
    const parts = trimed.split("@")
    if (parts.length !== 2 ) return "Enter valid email"
    if (parts[0]===""|| parts[1]==="") return "Enter valid email"
    const domain = parts[1]
    if (! domain.includes("." )|| domain.startsWith(".")|| domain.endsWith(".")) return "Enter valid email"
    return(null)  
}
export function validatePassword(password){
    if (password === "") return "Password is required"
    if (password.length < 8 ) return "Password must be atleast 8 characters"
    return (null)
}
export function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword === "")  return "Confirm password"
    if (password !== confirmPassword) return "Password does not match "
    return (null)
    
}
export function validateLoginForm({email, password}){
    return {
        email: validateEmail(email),
        password: password === ""? "Password is required ": null,
    }
}
export function validateRegisterForm({email, password, confirmPassword}){
    return{
        email: validateEmail(email),
        password: validatePassword(password),
        confirmPassword: validateConfirmPassword(password, confirmPassword)
    }

}
export function hasErrors(error){
    return Object.values(error).some((messages) => messages !== null)
}