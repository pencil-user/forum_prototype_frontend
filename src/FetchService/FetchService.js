import axios from 'axios'

//axios.defaults.baseURL = 'https://dusan-forum.herokuapp.com';

export const fetchPlain = axios

export const fetchWithJWT = axios.create()

export function addJWT(token) {
    fetchWithJWT.defaults.headers.common = {
        'X-Auth-Token': token
    }

}

export function removeJWT() {
    fetchWithJWT.defaults.headers.common = {

    }
}