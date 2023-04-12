import axios from 'axios';
//API-Key (secret) AIzaSyDW7ozYaZ9Z8_6pqHnyeVIJFNgwEkKrD_A
const instance = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
});

export default instance;