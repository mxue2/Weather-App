import React from 'react';

class CurrentWeather extends React.Component {

  render() {
    return (
      <section className='current-weather-container'>
        <div className='celus-container'>
          <h1>{this.props.temp}<span>&#176;</span></h1>
          <p>{this.props.description}</p>
          <img src={this.props.icon} alt='icon'></img>
        </div>
        <hr className='line-divider'/>
        <div className='info-container'>
          <p className='info-container_city'>{this.props.city}</p>
          <p className='info-container_date'>{this.props.time}</p>
        </div>
      </section>
    )
  };
};

export default CurrentWeather;