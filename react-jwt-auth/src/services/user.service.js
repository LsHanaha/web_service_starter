// Функция для получения данных с сервера Data service

import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8888/api/';
const ALL_ENDPOINT = 'all';
const USER_ENDPOINT = 'user';
const MODERATOR_ENDPOINT = 'mod';
const ADMIN_ENDPOINT = 'admin';
const PROFILE_ENDPOINT = 'uprofile'

class UserService {
    getPublicContent() {
        return axios.get(API_URL + ALL_ENDPOINT);
    }

    getProfileData(){
        return axios.get(API_URL + PROFILE_ENDPOINT, {headers: authHeader()});
    }

    getUserBoard() {
        return axios.get(API_URL + USER_ENDPOINT, {headers: authHeader()});
    }

    getModeratorBoard() {
        return axios.get(API_URL + MODERATOR_ENDPOINT, {headers: authHeader()});
    }

    getAdminBoard() {
        console.log(authHeader());
        return axios.get(API_URL + ADMIN_ENDPOINT, {headers: authHeader()});
    }
}

export default new UserService();
