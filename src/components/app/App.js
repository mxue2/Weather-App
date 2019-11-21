import React from "react";
import CurrentWeather from "../current-weather/CurrentWeather";
import SearchBar from "../search-bar/SearchBar";
import weather from "../../apis/weather";
import DetailWeather from "../detail-weather/DetailWeather";
import DetailForecast from "../detail-forecast/DetailForecast";
import FOG from "../../imgs/Fog.jpeg";
import Thunderstorm from "../../imgs/Thunderstorm.jpeg";
import Drizzle from "../../imgs/Drizzle.jpeg";
import Rain from "../../imgs/Rain.jpeg";
import Snow from "../../imgs/Snow.jpeg";
import Clear from "../../imgs/Clear.jpeg";
import Clouds from "../../imgs/Clouds.jpeg";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.bgRef = React.createRef();
    this.state = {
      loading: true,
      currData: {
        temp: 0,
        description: "",
        city: "",
        time: "",
        weatherIcon: "",
        sunrise: "",
        sunset: "",
        clouds: 0,
        humidity: 0,
        wind: 0
      },
      forecastWeather: {},
      query: "Melbourne",
    };
  }

  componentDidMount() {
    this.getDataFromOpenweather(this.state.query);
  }

  setBackground = condition => {
    const atomsphereConditions = [
      "Mist",
      "Tornado",
      "Squall",
      "Ash",
      "Dust",
      "Sand",
      "Fog",
      "Haze",
      "Smoke"
    ];

    if (atomsphereConditions.includes(condition)) {
      this.bgRef.current.style.backgroundImage = `url(${FOG})`;
      this.bgRef.current.style.backgroundPosition = "center";

    } else {
      switch (condition) {
        case "Thunderstorm":
          this.bgRef.current.style.backgroundImage = `url(${Thunderstorm})`;
          this.bgRef.current.style.backgroundPosition = "center";
          break;
        case "Drizzle":
          this.bgRef.current.style.backgroundImage = `url(${Drizzle})`;
          this.bgRef.current.style.backgroundPosition = "bottom";
          break;
        case "Rain":
          this.bgRef.current.style.backgroundImage = `url(${Rain})`;
          this.bgRef.current.style.backgroundPosition = "bottom";
          break;
        case "Snow":
          this.bgRef.current.style.backgroundImage = `url(${Snow})`;
          this.bgRef.current.style.backgroundPosition = "bottom";
          break;
        case "Clear":
          this.bgRef.current.style.backgroundImage = `url(${Clear})`;
          this.bgRef.current.style.backgroundPosition = "center";
          break;
        case "Clouds":
          this.bgRef.current.style.backgroundImage = `url(${Clouds})`;
          this.bgRef.current.style.backgroundPosition = "bottom";
          break;
        default:
          break;
      }
    }
  };

  getDataFromOpenweather = query => {
    // calling api to get weather data
    // console.log(query);
    weather
      .get("weather", {
        params: {
          q: query,
          appid: "ac844fe4fb88e2c1ab652f2d160d053e",
          units: "metric"
        }
      })
      .then(response => {
        // console.log(response.data);
        this.setState({
          currData: {
            temp: response.data.main.temp.toFixed(0),
            description: response.data.weather[0].description,
            city: response.data.name,
            time: this.timeConverter(response.data.dt),
            weatherIcon: "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + ".png",
            sunrise: this.getTime(response.data.sys.sunrise),
            sunset: this.getTime(response.data.sys.sunset),
            clouds: response.data.clouds.all,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed
          },
          
        });

        this.setBackground(response.data.weather[0].main);
      })

    weather
      .get("forecast", {
        params: {
          q: query,
          appid: "ac844fe4fb88e2c1ab652f2d160d053e",
          units: "metric"
        }
      })
      .then(response => {
        const allForecast = response.data.list;
        let forecasts = {};
        let whichDay = this.getDate(allForecast[0].dt);
        let tempList = [];
        allForecast.forEach(item => {
          const day = this.getDate(item.dt);
          if (day === whichDay) {
            tempList.push(item.main.temp);
          } else {
            forecasts[whichDay] = tempList;
            whichDay = day;
            tempList = [];
          }
        });
        Object.keys(forecasts).forEach(key => {
          forecasts[key] = (
            forecasts[key].reduce((sum, val) => {
              return sum + val;
            }, 0) / forecasts[key].length
          ).toFixed(0);
        });

        this.setState({
          forecastWeather: forecasts,
          loading: false
        });
      });
  };

  getHour(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const hour = a.getHours();
    return hour > 12 ? hour - 12 + "PM" : hour + "AM";
  }

  getDate(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    return a.getDate();
  }

  getTime(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const min = a.getMinutes();
    const hour = a.getHours();
    const currTime = hour > 12 ? hour - 12 + ":" + min + "PM" : hour + ":" + min + "AM";
    return currTime;
  }

  timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[a.getDay()];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const min = a.getMinutes();
    const hour = a.getHours();
    const currTime = hour > 12 ? hour - 12 + ":" + min + "PM" : hour + ":" + min + "AM";
    const time = day + " - " + date + " " + month + " " + year + " - " + currTime;
    return time;
  }

  handleSearching = query => {
    // console.log(query);
    this.setState({ query: query, loading: true });
    this.getDataFromOpenweather(query);
  };

  renderPage() {
    if (this.state.loading) {
      return <div></div>;
    } else {
      return (
        <DetailForecast
          query={this.state.query}
          forecast={this.state.forecastWeather}
        ></DetailForecast>
      );
    }
  }

  render() {
    return (
      <div className="app-container" ref={this.bgRef}>
        <div className="app">
          <div className="left-container">
            <SearchBar searching={this.handleSearching}></SearchBar>
            <CurrentWeather
              temp={this.state.currData.temp}
              description={this.state.currData.description}
              city={this.state.currData.city}
              time={this.state.currData.time}
              icon={this.state.currData.weatherIcon}
            ></CurrentWeather>
          </div>
          <div className="right-container">
            <DetailWeather 
              sunrise={this.state.currData.sunrise}
              sunset={this.state.currData.sunset}
              wind={this.state.currData.wind}
              humidity={this.state.currData.humidity}
              clouds={this.state.currData.clouds}

            ></DetailWeather>
            {this.renderPage()}            
          </div>
        </div>
      </div>
    );
  }

  // }
}

export default App;
