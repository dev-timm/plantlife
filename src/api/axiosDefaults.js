import axios from "axios";

axios.defaults.baseURL = 'https://drf-api-plantlife-bdbe99797603.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/formdata';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();