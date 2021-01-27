import axios from 'axios'

export default class MeRequest {
    
    constructor(token) {
        this.token = token
        this.baseUrl = `${window.config.API_URL}/me` 
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