import { jwtDecode } from "jwt-decode";

const getToken = () => localStorage.token;

const decodeToken = (token) => {
    try {
        const tokenData = jwtDecode(token);
        const userDetail = {};
        Object.keys(tokenData).forEach(key => {
            if(key.includes("claims")) {
                const claims = key.slice(key.lastIndexOf("/") + 1);
                userDetail[claims] = tokenData[key];
            }
        });

        return userDetail;
    } catch {
        console.log(">>> Invalid token: " + token);
    }
}

export { getToken, decodeToken }