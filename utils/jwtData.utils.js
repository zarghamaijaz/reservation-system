export const getJwtData = () => {
    const jwtData = localStorage.getItem('auth');
    if(jwtData){
        return JSON.parse(jwtData);
    }
    return jwtData;
}