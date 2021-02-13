import axios from 'axios'

export default class MatchRequest {

    constructor(token, origem_id, destino_id) {
        this.token = token
        this.origem_id = origem_id
        this.destino_id = destino_id
        this.baseUrl = `${window.config.API_URL}/match`
    }

    send() {
        const headers = {
            'authorization': 'Bearer ' + this.token
        }

        return axios.post(
            this.baseUrl,
            { origem_id: this.origem_id, destino_id: this.destino_id },
            { headers }
        )
    }
}