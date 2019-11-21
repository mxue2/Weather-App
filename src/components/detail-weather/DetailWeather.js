import React from 'react';
import PieComponent from './PieComponent';

class DetailWeather extends React.Component {

  calWind = () => {
    if(this.props.wind < 0.3){
      return [0, 0];
    }else if (this.props.wind >= 0.3 && this.props.wind <= 1.5){
      return [1, (1/12).toFixed(2)*100];
    }else if (this.props.wind >= 1.6 && this.props.wind <= 3.3){
      return [2, (2/12).toFixed(2)*100];
    } else if (this.props.wind >= 3.4 && this.props.wind <= 5.5){
      return [3, (3/12).toFixed(2)*100];
    } else if (this.props.wind >= 5.5 && this.props.wind <= 7.9){
      return [4, (4/12).toFixed(2)*100];
    } else if (this.props.wind >= 8.0 && this.props.wind <= 10.7){
      return [5, (5/12).toFixed(2)*100];
    } else if (this.props.wind >= 10.8 && this.props.wind <= 13.8){
      return [6, (6/12).toFixed(2)*100];
    } else if (this.props.wind >= 13.9 && this.props.wind <= 17.1){
      return [7, (7/12).toFixed(2)*100];
    } else if (this.props.wind >= 17.2 && this.props.wind <= 20.7){
      return [8, (8/12).toFixed(2)*100];
    } else if (this.props.wind >= 20.8 && this.props.wind <= 24.4){
      return [9, (9/12).toFixed(2)*100];
    }else if (this.props.wind >= 24.5 && this.props.wind <= 28.4){
      return [10, (10/12).toFixed(2)*100];
    }else if (this.props.wind >= 28.5 && this.props.wind <= 32.6){
      return [11, (11/12).toFixed(2)*100];
    }else if (this.props.wind >= 32.7){
      return [12, (12/12).toFixed(2)*100];
    }
  }

  render() {
    return (
      <div className='detail-weather-container'>
        <div className='time-container'>
          <p className='time-container-sunrise'>sunrise {this.props.sunrise}</p>
          <p className='time-container-sunset'>sunset {this.props.sunset}</p>
        </div>
        <div className='related-weather-info-container'>
          <PieComponent label='Clouds' pienum={this.props.clouds} piePercent={this.props.clouds}></PieComponent>
          <PieComponent label='Humidity' pienum={this.props.humidity} piePercent={this.props.humidity}></PieComponent>
          <PieComponent label="Wind" pienum={this.calWind()[0] } piePercent={this.calWind()[1]}/>

        </div>
      </div>
    )
  }
}

export default DetailWeather;