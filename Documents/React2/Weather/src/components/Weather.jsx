import React, { useEffect } from 'react'
import './Weather.css'
import search from '../assets/search.png'
import clear from '../assets/clear.png'	
import cloud from '../assets/cloud.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'	
import wind from '../assets/wind.png'	


const Weather = () => {

  const[ weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear,
    "o1n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  }

const search = async (city)=>{
  try{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const icon = allIcons[data.weather[0].icon] || clear;

    setWeatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: data.name,
      icon: icon
    });
  }
  catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  search("London")
},[])

  return (

    <div className="app">
      
      <div className='weather'>
      
      <div className="search-bar">

        <input type="text" placeholder="Search..." />
        <img src={search} alt="" />
      </div>


    <img src={clear} alt="" className="weather-icon"/>
    <p className='temperature'>{weatherData.temp}</p>
    <p className='location'>{weatherData.location}</p>

    <div className="weather-data">

      <div className="col">
        <img src={humidity} alt="" />
        <div>
        <p>{weatherData.humidity}</p>
        <span>Humidity</span>
        </div>
      </div>

      <div className="col">
        <img src={wind} alt="" />
        <div>
        <p>{weatherData.windSpeed}</p>
        <span>Wind Speed</span>
        </div>
      </div>
      
      
    </div>

    </div>


    </div>
  
  )
}

export default Weather
