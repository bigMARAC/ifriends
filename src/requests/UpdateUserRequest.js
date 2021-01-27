import axios from 'axios'

export default class UpdateUSerRequest {
    
    constructor(token, data) {
        this.token = token
        this.data = data
        this.baseUrl = `${window.config.API_URL}/me` 
    }
    
    send() {
        const headers = {
            'token': this.token
        }
        
        return axios.put(
            this.baseUrl,
            this.data,
            { headers }
        )
    }
}