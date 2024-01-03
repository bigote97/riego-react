async function getWeatherData(api_key, city) {
    const API_URL = "http://api.openweathermap.org/data/2.5/weather"
    const params = {
        q: city,
        appid: api_key,
        lang: 'es',
        units: 'metric'  // You can change to 'imperial' for Fahrenheit units
    };

    try {
        const response = await fetch(`${API_URL}?${new URLSearchParams(params)}`);
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error(`Error fetching weather data: ${error}`);
        return { temperature: 0, humidity: 0, pressure: 0, main: '' };
    }
}
export default getWeatherData