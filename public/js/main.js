const cityName  = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');

const temp_status = document.getElementById('temp_status');
const temp_real_val  = document.getElementById('temp_real_val');
const dataHide    = document.querySelector('.middle_layer');

const day = document.getElementById('day');
const today_date = document.getElementById('today_date');

const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thusday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    return day;
}
day.innerHTML = getCurrentDay();

const getCurrentDate = () => {
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ];
    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();
    

    return `${date} ${month}`;
}

today_date.innerHTML = getCurrentDate();



const getInfo = async(event) => { 
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === '') {
        city_name.innerText = `Plz write the city name before search`;
        dataHide.classList.add('data_hide');
    } else {
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=7c6dae830103e544431346abb34eec77`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp; 
            const tempMood = arrData[0].weather[0].main;

             if(tempMood == "Clear")
            {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>"; 
            }
            else if(tempMood == "Clouds")
            {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #0097e6;'></i>"; 
            }
            else if(tempMood == "Rainy")
            {
             weatherCon.innerHTML = "<i class='fas fa-cloud-rain' style='color: #f1f2f6;'></i>"; 
            } 
            else {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #0097e6;'></i>"; 
            }
            dataHide.classList.remove('data_hide');
        } catch {
            city_name.innerText = `Plz write the city name properly`;
            dataHide.classList.add('data_hide');
        }
        
    }
    
}

submitBtn.addEventListener('click', getInfo);