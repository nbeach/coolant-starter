
export const getAuthenticationToken = () => {
    let token = localStorage.getItem("authToken")
    if (token === null) {
        token = prompt("Please provide your token")
        if (token === null) { throw new Error("Could not get token") }
        localStorage.setItem("authToken", token)
    }
    return token
}
