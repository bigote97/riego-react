import React, { useEffect, useState } from 'react';
import getWeatherData from './Service';
import './Clima.css'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const Clima = () => {

  const [climateIcon, setClimateIcon] = useState(null)
  const [climateDescription, setClimateDescription] = useState(null)
  const [climate, setClimate] = useState(null)
  const [wind, setWind] = useState(null)
  const [city, setCity] = useState(null)

  // Con esta funcion transformo la direccion del viento en degs puntos cardinales
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  useEffect(() => {
    let api_key = JSON.parse(localStorage.getItem("api_key"))
    const city = JSON.parse(localStorage.getItem("ciudad"));

    let data = JSON.parse(localStorage.getItem('weatherData'));
    // genero una variable con la hora actual
    let diferenciaEnMinutos = null
    if (data) {
      const ahora = new Date();
      
      // genero una variable con la hora almacenada
      const horaAlmacenadaDate = new Date(data.horaConsulta);
      
      // Calculo la diferencia entre el horario guardado y el actual
      diferenciaEnMinutos = (ahora - horaAlmacenadaDate) / (1000 * 60);
    }
    
    // Si tengo info. guardada y la diferencia entre el horario guardado y el actual
    // es menor a 15 minutos, uso los datos almacenados, sino realizo una nueva consulta.
    // Esto lo hago para no realizar una cantidad alta de consultas a la API de clima.
    if (data && diferenciaEnMinutos && diferenciaEnMinutos < 15) {
      
      setClimateIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
      setClimateDescription(data.weather[0].description)
      setClimate(data.main)
      setCity(data.name)
      setWind(data.wind)
    } else {
      getWeatherData(api_key, city)
        .then(weatherData => {
          // Almaceno la hora de la consulta
          if (weatherData.cod !== 401) {
            let horaConsulta = new Date().toISOString()
            weatherData['horaConsulta'] = horaConsulta
            localStorage.setItem('weatherData', JSON.stringify(weatherData));
            setClimateIcon(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon.replace('n','d')}@2x.png`)
            setClimateDescription(weatherData.weather[0].description)
            setClimate(weatherData.main)
            setCity(weatherData.name)
            setWind(weatherData.wind)
          } else {
            setClimateIcon(null)
            setClimateDescription(null)
            setClimate(null)
            setCity(null)
            setWind(null)
          }
        });
    }
  }, []); 

  return (
    <div className='climate-container'>
      <h2>Clima</h2>
      { climateIcon &&
        <div className='climate-card'> 
          <div className='climate-card-title'>
            <div className='climate-card-title-content'>
              <LocationOnIcon/>
              <span>{city}</span>
            </div>
            <div className='climate-card-title-content'>
              <ArrowDownwardIcon/>
              <span>{climate.temp_min}°</span>
              <ArrowUpwardIcon/>
              <span>{climate.temp_max}°</span>
            </div>
          </div>
          <div className='climate-card-body'>
            <div className='climate-card-body-wind'>
              <p>{wind.speed}km/h</p>
              <p>Dir: {getWindDirection(wind.deg)}</p>
            </div>
            <div className='climate-card-body-weather'>
              <img src={climateIcon} alt='icono clima' />
              <p>{climateDescription}</p>
            </div>
            <div className='climate-card-body-main'>
              <p>{climate.temp}°</p>
              <p>{climate.humidity}%</p>
              <p>{climate.pressure} hPa</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
