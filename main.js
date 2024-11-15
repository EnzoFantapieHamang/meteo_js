const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const error = document.querySelector(".not-found");
const weather = document.querySelector(".weather-box");
const details = document.querySelector(".weather-details");

search.addEventListener("click", () => {

    const APIKey = '9a4545cd945cdcceb04081331dee1195';
    const city = document.querySelector(".search-box input").value;

    if(city ==='')
        return;
    else{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics&appid=${APIKey}`)
        .then(response => response.json())
        .then(json =>{

            if(json.cod === "404"){
                container.style.height = '500px';
                weather.style.display = 'none';
                details.style.display = 'none';
                error.style.display = 'block';
                error.classList.add("fade-in");
                return;
            } else {
                error.style.display = 'none';
                error.classList.remove("fade-in");

                const image = document.querySelector(".weather-box img");
                const temperature = document.querySelector(".weather-box .temperature");
                const description = document.querySelector(".weather-box .description");
                const humidity = document.querySelector(".weather-details .humidity span");
                const wind = document.querySelector(".weather-details .wind span");

                switch (json.weather[0].main){
                    case 'Clear' :
                        image.src = 'img/soleil.png';
                        break;
                    case 'Snow' :
                        image.src = 'img/neige.png';
                        break;
                    case 'Haze' :
                        image.src = 'img/tonnerre.png';
                        break;
                    case 'Rain' :
                        image.src = 'img/pluie.png';
                        break;
                    case 'Clouds' :
                        image.src = 'img/nuages.png';
                        break;
                }

                temperature.innerHTML = `${parseInt(json.main.temp) - 273}<span>°C</span>`;

                description.innerHTML = `${json.weather[0].description}`;

                humidity.innerHTML = `${json.main.humidity}%`;

                wind.innerHTML = `${parseInt(json.wind.speed*3.6)}Km/h`;

                container.style.height = '650px';
                weather.style.display = 'flex';
                details.style.display = 'flex';
                weather.classList.add("fade-in");
                details.classList.add("fade-in");

            }


        })
    }
    


})