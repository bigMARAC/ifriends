import axios from 'axios'

export default class UpdateUSerRequest {
    
    constructor(token, data) {
        this.token = token
        this.data = data
        this.baseUrl = `${window.config.API_URL}/alunos` 
    }
    
    send() {
        const headers = {
            'authorization': 'Bearer ' + this.token
        }
        
        return axios.put(
            this.baseUrl,
            this.data,
            { headers }
        )
    }
}