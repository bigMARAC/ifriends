import axios from 'axios'

export default class GetSubjectsRequest {
    
    constructor(token) {
        this.token = token
        this.baseUrl = `${window.config.API_URL}/materias` 
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