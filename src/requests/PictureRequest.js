import axios from 'axios'

export default class MeRequest {
    
    constructor(token, foto) {
        this.token = token
        this.foto = foto
        this.baseUrl = `${window.config.API_URL}/picture`

    }
    
    send() {
        const headers = {
            'authorization': 'Bearer ' + this.token,
            'Content-Type': 'multipart/form-data'
        }

        const data = new FormData()
        data.append('file', this.foto)

        return axios.post(
            this.baseUrl,
            data, 
            { headers }
        )
    }
}