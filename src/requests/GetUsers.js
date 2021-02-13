import axios from 'axios'

export default class GetUsersRequest {
    
    constructor(token) {
        this.token = token
        this.baseUrl = `${window.config.API_URL}/alunos` 
    }
    
    send() {
        const headers = {
            'authorization': 'Bearer ' + this.token
        }

        return axios.get(
            this.baseUrl, 
            { headers }
        )
    }
}