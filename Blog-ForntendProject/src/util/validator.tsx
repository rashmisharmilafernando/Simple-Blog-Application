const nameRegex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;  //Rashmi Sharmila
const usernameRegex = /^[a-z0-9]+$/i; //rashi123
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //rsrashi0430@gmail.com
const passwordReg = /^[a-zA-Z0-9]{8}$/; //rashi123


export function validatefname(name: string): boolean {
    return nameRegex.test(name)
}

export function validateUsername(username: string): boolean {
    return usernameRegex.test(username)
}

export function validateEmail(email: string): boolean {
    return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
    return passwordReg.test(password)
}