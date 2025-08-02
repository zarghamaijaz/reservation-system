import { jwtDecode } from "jwt-decode";

export const  getJwtData = () => {
    const jwtData = localStorage.getItem('auth');
    if(jwtData){
        const decoded = jwtDecode(jwtData);
        return decoded;
    }
    else return false;
}


// export const getJwtData = () => {
//     const jwtData = localStorage.getItem('auth');
//     if(jwtData){
//         return JSON.parse(jwtData);
//     }
//     return jwtData;
// }