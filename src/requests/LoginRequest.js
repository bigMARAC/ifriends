import axios from 'axios'

export default class LoginRequest {
    
    constructor(login, password) {
        this.login = login
        this.password = password
        this.baseUrl = `${window.config.API_URL}/auth` 
    }
    
    send() {
        return axios.post(this.baseUrl, { login: this.login, password: this.password })
    }
}