import axios from 'axios'

export default class GetMatchsRequest {
    
    constructor(token) {
        this.token = token
        this.baseUrl = `${window.config.API_URL}/match` 
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