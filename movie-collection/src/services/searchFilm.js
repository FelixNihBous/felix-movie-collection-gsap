import axios from 'axios';

export async function getData() {
    const response = axios.get(`https://imdb.iamidiotareyoutoo.com/search?q=${searchTitle}`)

}