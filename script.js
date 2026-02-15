const apiKey = '0cdfb5415c34f20241e1eb1663dd10d7';

document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city').value;
    getWeather(city);
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    // Show the wrapper
    const wrapper = document.getElementById('weather-wrapper');
    wrapper.classList.remove('hide');

    // Fill in the data
    document.getElementById('w-place').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('w-temp').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('w-min').textContent = `Min: ${Math.round(data.main.temp_min)}°C`;
    document.getElementById('w-max').textContent = `Max: ${Math.round(data.main.temp_max)}°C`;
    document.getElementById('w-desc').textContent = data.weather[0].description;
    document.getElementById('w-humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('w-wind').textContent = `${data.wind.speed} m/s`;
    
    // Convert Unix timestamp to readable time
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    document.getElementById('w-sunrise').textContent = sunrise;
    document.getElementById('w-sunset').textContent = sunset;

    // Set Icon
    const iconCode = data.weather[0].icon;
    document.getElementById('w-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}