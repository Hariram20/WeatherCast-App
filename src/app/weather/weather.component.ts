import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  cityName: string = '';
  weatherData: any;
  weatherIcon: string = '';
  showLatLongInputs = false;
  lat?: number;
  long?: number;
  

  constructor(private auth:AuthService){}

  ngOnInit(): void{
    this.auth.canAccess();
  }

  toggleLatLongInputs(event: any) {
    if (event.target.checked) {
      this.showLatLongInputs = true;
    } else {
      this.showLatLongInputs = false;
    }
  }

  fetchWeather() {
          
    if ((this.lat && this.long) || this.cityName) {
      if (this.lat && this.long) {
        this.auth.getWeatherByCoordinates(this.lat, this.long).subscribe(
          (data) => this.updateWeatherData(data),
          (error) => this.handleWeatherError(error)
        );
      } else {
        this.auth.getWeatherByCityName( this.cityName).subscribe(
          (data) => this.updateWeatherData(data),
          (error) => this.handleWeatherError(error)
        );
      }
    } else {
      this.weatherData = null;
    }    
  }

  updateWeatherData(data: any) {
    this.weatherData = data;
    this.cityName = data.name;

    if (data.weather && data.weather.length > 0) {
      const weatherCondition = data.weather[0].main.toLowerCase();
      switch (weatherCondition) {
        case 'clouds':
          this.weatherIcon = 'assets/images/clouds.png';
          break;
        case 'clear':
          this.weatherIcon = 'assets/images/clear.png';
          break;
        case 'rain':
          this.weatherIcon = 'assets/images/rain.png';
          break;
        case 'drizzle':
          this.weatherIcon = 'assets/images/drizzle.png';
          break;
        case 'mist':
          this.weatherIcon = 'assets/images/mist.png';
          break;
        default:
          this.weatherIcon = 'assets/images/rain.png'; 
          break;
      }
    }
  
  }

  handleWeatherError(error: any) {
    console.error('Error fetching weather data:', error);
    this.weatherData = null;
  }
  
  searchByCity() {    
    this.fetchWeather();
  }

}
