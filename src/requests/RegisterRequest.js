import axios from 'axios'

export default class LoginRequest {
    
    constructor(login, password, name) {
        this.login = login
        this.password = password
        this.name = name
        this.baseUrl = `${window.config.API_URL}/register` 
    }
    
    send() {
        return axios.post(this.baseUrl, { login: this.login, password: this.password, name: this.name })
    }
}