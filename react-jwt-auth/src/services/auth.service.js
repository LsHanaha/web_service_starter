// класс с действиями для авторизации.аутентификации пользователя. Authentication service

import axios from 'axios';


const API_URL = "http://localhost:8888/api/auth/";
const LOGIN_ENDPOINT = 'signin';
const SIGNUP_ENDPOINT = 'signup';



function parseJwt (token) {
    let base64Url = token.split('.')[1];
    console.log('base64url = ', base64Url);
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    console.log('base64 = ', base64);
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log('jsonPayload = ', jsonPayload);

    return JSON.parse(jsonPayload);
}


class AuthService {

    login(username, password) {
        return axios
            .post(API_URL + LOGIN_ENDPOINT,
                {
                    username,
                    password
            })
            .then(response => {
                if (response.data) {
                    console.log(response)
                    if (response.data.accessToken) {
                        let token = response.data.accessToken;
                        console.log('Here is the token\n\n\n', JSON.stringify(token));

                        localStorage.setItem('user', JSON.stringify(response.data));
                    }
                    else return (response.data);
                }
                console.log('login = ', response.data);
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username, email, password) {
        return axios.post(API_URL + SIGNUP_ENDPOINT, {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        // console.log(JSON.parse(localStorage.getItem('user')));
        console.log('in get user');
        console.log(localStorage.getItem('user'));
        if (localStorage.getItem('user')) {
            let token = JSON.parse(localStorage.getItem('user')).accessToken;
            console.log('get_current_user_token = ', token);
            console.log(parseJwt(token));
            return (parseJwt(token));
        } else return undefined
    }
}

export default new AuthService();
