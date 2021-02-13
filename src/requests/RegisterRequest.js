import axios from 'axios'

export default class LoginRequest {
    
    constructor(login, password, name, ids) {
        this.login = login
        this.password = password
        this.name = name
        this.ids = ids
        this.baseUrl = `${window.config.API_URL}/alunos` 
    }
    
    send() {
        return axios.post(this.baseUrl, { matricula: this.login, senha: this.password, nome: this.name, ids: this.ids })
    }
}