import axios from 'axios'

export default class LoginRequest {
    
    constructor(name, login, turma, instagram, phone, desc, password, ids) {
        this.name = name
        this.login = login
        this.turma = turma
        this.instagram = instagram
        this.phone = phone,
        this.desc = desc
        this.password = password
        this.ids = ids
        this.baseUrl = `${window.config.API_URL}/alunos` 
    }

    send() {
        return axios.post(this.baseUrl, {
            nome: this.name, 
            matricula: this.login, 
            desc: this.desc,
            phone: this.phone,
            instagram: this.instagram,
            turma: this.turma,
            senha: this.password, 
            ids: this.ids 
        })
    }
}