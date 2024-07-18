const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = '0f5a98d2bcd44cb231abf4af5fa2ba94';
    const city = document.querySelector('.search-box input').value;
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main.toLowerCase()) {
                case 'clear':
                    image.src = './sun.png';
                    break;
                case 'rain':
                    image.src = './rain.png';
                    break;
                case 'snow':
                    image.src = './snow.png';
                    break;
                case 'clouds':
                    image.src = './cloud.png';
                    break;
                case 'mist':
                case 'haze':
                    image.src = './fog.png';
                    break;
                default:
                    image.src = './cloud.png';
                    break;
            }

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerText = json.weather[0].description;
            humidity.innerText = `${json.main.humidity}%`;
            wind.innerText = `${Math.round(json.wind.speed)}Km/h`;
        })
        .catch(err => console.error('Error fetching weather data:', err));
});
