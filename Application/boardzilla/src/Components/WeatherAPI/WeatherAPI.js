import React from 'react';
import WeatherHolder from "./WeatherHolder";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css'
import SearchWeather from './SearchWeather';
import "../../App.css"

const WeatherAPI_Key = "85bad358fc86a7b83f6656d9c3153cf0";


class WeatherAPI extends React.Component {
    constructor() {
      super();
      this.state = {
        city: undefined,
        country: undefined,
        icon: undefined,
        main: undefined,
        celsius: undefined,
        temp_max: null,
        temp_min: null,
        description: "",
        error: false,

      };
      //this.getWeather();

      this.weatherIcon = {
        Thunderstorm: "wi-thunderstorm",
        Drizzle: "wi-sleet",
        Rain: "wi-storm-showers",
        Snow: "wi-snow",
        Atmosphere: "wi-fog",
        Clear: "wi-day-sunny",
        Clouds: "wi-day-fog"
      };

    }

    get_Celsius(temp) {
        return Math.floor(temp - 273.15);
      }

      
    getIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
        }
    }



    getWeather = async e =>{
        e.preventDefault();
        const country = e.target.elements.country.value;
        const city = e.target.elements.city.value;

        if (country && city) {
            const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${WeatherAPI_Key}`
      );

        const response = await api_call.json();

        console.log(response);

        //setState to change the response 
        this.setState({
            city: response.name,
            country: response.sys.country,
            celsius: this.get_Celsius(response.main.temp),
            temp_max: this.get_Celsius(response.main.temp_max),
            temp_min: this.get_Celsius(response.main.temp_min),
            description: response.weather[0].description,
            // when we have response, error is zero
            error: false
        })
        this.getIcon(this.weatherIcon, response.weather[0].id);}
        else {
            this.setState({
              error: true
            });
          }

    };



    render() {
      return ( 
        <div className = "news">
            
            <SearchWeather loadweather={this.getWeather} error={this.state.error} />
            <WeatherHolder
            city ={this.state.city} 
            country = {this.state.country}
            temp_celsius={this.state.celsius}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            description={this.state.description}
            weatherIcon={this.state.icon}
        />
        </div>   
      
      );
    }
  }
  export default WeatherAPI;