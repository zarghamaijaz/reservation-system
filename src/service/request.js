import axios from 'axios';

const requestInterceptor = (config) => {
  // Adding the JWT token to the request headers. This way it gets sent with every request
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('auth');
  return config;
};
const responseInterceptor = (response) => {
  if(response.status >= 200 && response.status < 300){
    return response.data;
  } else {
    // Handle other error responses (non-2xx and non-400)
    console.error('Error:', response.statusText); // Log the error message
    // Handle other errors as needed (e.g., throw an error)
    return response;
  }
};

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(responseInterceptor, (error) => {
  console.error('Network Error:', error); // Log the network error
  try{
    if(error.response.status === 401){
        console.log('Logout user here.')
      // window.location.replace('/logout?tokenExpired=true');
      return Promise.reject(error.response.data);
    }
    else{
      return Promise.reject(error.response.data);
    }
  } catch(err){
    console.error(err);
    return Promise.reject({message: 'Error reaching the server. Please try again later.'})
  }
});

const request = axios;

export default request;