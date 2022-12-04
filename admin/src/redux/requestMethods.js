import axios from "axios";

const BASE_URL = "http://localhost:5003/api/";
let TOKEN;

try{
    TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
}catch(e){

}

export const publicRequest = axios.create({
    baseURL : BASE_URL
});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : {token : "Bearer "+TOKEN}
});