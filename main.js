const API_KEY = "0294c5013243604f6044315da2b451f8";
const API_URL = "https://api.openweathermap.org/data/2.5/forecast?";
const default_city = "Budapest";

const s = id => document.getElementById(id);
const cs = className => document.getElementsByClassName(className);

const query = city => {
    return new Promise((resolve, reject) => {
        fetch(API_URL + `q=${city}&units=metric&appid=` + API_KEY)
            .then(response => response.json()
            .then(data => resolve(data)));
    });
};

const filterResults = data => {
    let prev_item = null;
    
    return data['list'].filter(forecast => {
        if(prev_item === null 
            || (forecast.dt_txt.split(" ")[0] != prev_item.dt_txt.split(" ")[0] && forecast.dt_txt.split(" ")[1] == "12:00:00")){
            prev_item = forecast;
            return true;
        }
        return false;
    });
};

const showData = (datas, count) => {
    const cards = cs("forecast_card");
    console.log(cards);
    datas.map((data, index) => {
        if(index >= count){
            return;
        }

        if(index == 0){
            cards[0].children[0].style.background = `url('/images/${data.weather[0].icon}.svg') no-repeat`;
            cards[0].children[1].innerHTML = `${data.main.temp} °C`;
            cards[0].children[2].innerHTML = `${data.main.humidity} %`;
        }
        else{
            cards[index].children[0].style.background = `url('/images/${data.weather[0].icon}.svg') no-repeat`;
            cards[index].children[1].innerHTML = `${data.main.temp} °C`;
        }
    });
};

window.onload = async () => {
    let forecast = await query(default_city);
    let relevantData = filterResults(forecast);
    showData(relevantData, 5);
};
