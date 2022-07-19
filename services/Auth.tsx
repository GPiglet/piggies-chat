import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/api/v1',
    timeout: 1000,
});

const setToken = (token: string) => {
    instance.interceptors.request.use( (config: any) => {
        config.headers.Authorization =  `Bearer ${token}`;
        return config;
    });
}

const signup = (user: any, subscriber: any, onError: any) => {
    instance.post('/signup', {...user})
    .then((res) => {
        if ( subscriber ) subscriber({...res.data, password: user.password});
    })
    .catch((err) => {
        if ( onError ) onError(err);
    })
}

const login = (email: string, password: string, isRemember: boolean, subscriber: any, onError: any) => {
    instance.post('/login', {email, password})
    .then((res) => {

        const token = res.data.token;
        // set token in axios global header
        setToken(token);

        // store token in local storage
        if ( isRemember ) localStorage.setItem('app_token', token);        

        if ( subscriber ) subscriber(res.data);
    })
    .catch((err) => {
        if ( onError ) onError(err);
    })
}

const profile = (subscriber: any, onError: any) => {
    instance.get('/profile')
    .then( (res) => {
        if ( subscriber ) subscriber(res.data);
    })
    .catch( (err) => {
        if ( onError ) onError(err);
    })
}


const AuthApi = {
    instance, setToken, signup, login, profile
}

export default AuthApi;