const axios = require('axios');
const urlAPI = require('../fixtures/url_data.json');

export class DataPool {
    
    constructor(
    ) {}

    async  getData() {
        try {
            const response = await axios.get(urlAPI.invalid_pool_tag);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

}



  