import axios from 'axios'

axios.defaults.baseURL = 'https://dusan-forum.herokuapp.com';

//axios.defaults.baseURL = 'http://localhost:3001';

let interceptor = (response) => {
    let key, keys = Object.keys(response.headers);
    let n = keys.length;
    let headers = {}
    while (n--) {
        key = keys[n];
        headers[key.toLowerCase()] = response.headers[key];
    }

    return { ...response, headers };
}

axios.interceptors.response.use(interceptor);


export const fetchPlain = axios

export const fetchWithJWT = axios.create()

fetchWithJWT.interceptors.response.use(interceptor);


export function addJWT(token) {
    fetchWithJWT.defaults.headers.common = {
        'X-Auth-Token': token
    }

}

export function removeJWT() {
    fetchWithJWT.defaults.headers.common = {

    }
}