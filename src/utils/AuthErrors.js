const messages = {
    "auth/email-already-in-use": "This account already exists. Try logging in",
    "auth/invalid-email": "Email address does not exist",
    "auth/weak-password": "Choose a strong password with 8 characters",
    "auth/invalid-credential": "Invalid email/password",
    "auth/user-not-found": "Invalid email/password",
    "auth/wrong-password": "Invalid email/password",
    "auth/user-disabled": "Account has been disabled",
    "auth/too-many-requests": "Too many attempts. Try again later",
    "auth/network-request-failed": "Check your connection",
    "auth/operation-not-allowed": "This sign-in method is not enabled yet",
    "auth/popup-blocked": "Your browser blocked the sign-in window. Allow pop-ups and try again",
    "auth/account-exists-with-different-credential": "An account with this email already exists using a different sign-in method",
    "auth/popup-closed-by-user": "",
    "auth/cancelled-popup-request": "",
}

export function getErrorMessages(error) {
    const code = error?.code
    return messages[code] ?? "Something went wrong. Try again"
}