import axios from 'axios'

export default class GetSubjectsRequest {
    
    constructor(token) {
        this.token = token
        this.baseUrl = `${window.config.API_URL}/subject/all` 
    }
    
    send() {
        const headers = {
            'token': this.token
        }

        return axios.get(
            this.baseUrl, 
            { headers }
        )
    }
}