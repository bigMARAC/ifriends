import axios from 'axios'

export default class LoginRequest {
    
    constructor(login, password) {
        this.login = login
        this.password = password
        this.baseUrl = `${window.config.API_URL}/login` 
    }
    
    send() {
        return axios.post(this.baseUrl, { matricula: this.login, senha: this.password })
    }
}