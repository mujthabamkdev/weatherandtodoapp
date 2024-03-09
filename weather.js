class Weather {
  constructor() {
    this.locationSearch = document.querySelector('.location-search');
    this.locationSearchInput = document.querySelector('.location-search-input');
    this.weatherInfoBlock = document.querySelector('.weather-info-block');
    this.weatherInfoImage = document.querySelector('.weather-info-image');
    this.weatherInfoTemp = document.querySelector('.weather-info-temp');
    this.weatherInfoName = document.querySelector('.weather-info-name');
    this.feelsLike = document.querySelector('.feels-like');
    this.humidity = document.querySelector('.humidity');
    this.windSpeed = document.querySelector('.wind-speed');

    this.addListeners();
  }

  addListeners() {
    this.locationSearch.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!this.locationSearchInput.value) {
        return;
      }
      this.weatherInfo = await this.getWeatherInfo(this.locationSearchInput.value);
      if (this.weatherInfo) {
        this.renderWeatherInfo();
      }
      this.locationSearchInput.value = '';
    });
  }

  getUrl(location) {
    const apiKey = '632adab9f7cc02ebb0be26900fc7507b';
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  }

  async getWeatherInfo(location) {
    try {
      const url = this.getUrl(location);
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      alert(err.message + ' result');
      console.log('Cannot fetch a location', err);
      return;
    }
  }

  renderWeatherInfo() {
    const celciusTemperature = Math.floor(this.weatherInfo.main.temp - 273);
    const celciusFeelsLikeTemperature = Math.floor(this.weatherInfo.main.feels_like - 273);
    this.weatherInfoImage.setAttribute("src", `/public/${this.weatherInfo.weather[0].icon}.png`);
    this.weatherInfoName.textContent = this.weatherInfo.name;
    this.weatherInfoTemp.textContent = `${celciusTemperature}°C`;
    this.humidity.textContent = this.weatherInfo.main.humidity;
    this.windSpeed.textContent = this.weatherInfo.wind.speed;
    this.feelsLike.textContent = celciusFeelsLikeTemperature;
    this.weatherInfoBlock.classList.remove("hidden");
  }
}

new Weather();