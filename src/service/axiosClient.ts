import axios from 'axios';
import queryString from 'query-string';

import {   LocalStorageService } from "@/_helpers/";
const localStorageService = LocalStorageService.getService();

const defaultHeader = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  //'versionapp': localStorage.getItem("versionapp") || '1.0.0',
  // 'clientid': process.env.REACT_APP_CLIENT_ID,
  // 'hashcode': process.env.REACT_APP_CLIENT_HASH,
  // 'versionos': osVersion + ' ' + osName,
  // 'devicename': deviceName

}

// for multiple requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })
  
  failedQueue = [];
}

const baseURL: string = import.meta.env.VITE_BASE_URL.toString() || ''

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL:baseURL,
  // withCredentials: true,
  //headers: defaultHeader,
  paramsSerializer: (params) => queryString.stringify(params),
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  config => {

      const token = localStorageService.getAccessToken();
      if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
      }

      const address = localStorageService.getAccessAccount();
      if (address) {
          config.headers['address'] = address;
      }

      return config;

  },error => {
      Promise.reject(error)
  });

//Add a response interceptor
axiosClient.interceptors.response.use( (response) => {
 return handleResponse(response)
},  (error) => {
  
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {

      console.log("HET^! TOKEN ")
         
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject})
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosClient.request(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

      originalRequest._retry = true;
      isRefreshing = true;


  }

  return Promise.reject(handleError(error)) ;

});


const handleResponse = (res) =>{

  if (res && res.data) {
    return res.data;
  }

  return res;

}

const handleError = (error)  => {

  const { data } = error.response;

  if( data && (data.error_code === "USER_LOCKED_USING") ){
    clearAuthToken()
  }

  return data;

}

const clearAuthToken = () =>{
  LocalStorageService.clearToken();
  window.location.reload();  
}

export default axiosClient;