const API_KEY = "db3b32d3becf0ad52624477e41424460";
const API_URL = "https://api.openweathermap.org/data/2.5/forecast?";

const s = id => document.getElementById(id);

fetch(API_URL + `q=Budapest&units=metric&appid=` + API_KEY)
    .then(response => response.json()
    .then(data => console.log(data)));