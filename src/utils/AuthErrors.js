const messages = {
    "auth/email-already in use": "This account already exists. Try logging in",
    "auth/invalid-email":"Email address does not exist",
    "auth/weak-password" :"Choose a strong password with 8 characters",
    "auth/invalid-credential":"Invalid email/password",
    "auth/user-not-found": "Invalid email/password",
    "auth/wrong-password":"Invalid email/password",
    "auth/user-disabled":"Account has been disabled",
    "auth/too-many-requests":"Too many attempts.Try again later",
    "auth/network-request-failed":"Check your connection",
    "auth/account-already-exists":"email already exists",
    "auth/popup-closed-by-user":"",
    "auth/cancelled-popup-request":"",
}
export function getErrorMessages(error) {
    const code = error?.code
    return messages[code] ?? "Something went wrong.Try again"
}