import React from 'react'

const Weather = (props) => {
  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">

        </div>
        <div className="card-body">
          <h5 className="card-title">London's Forecast For Tomorrow at 09:00-12:00</h5>
          <h1 className="display-1">{props.temperature} °C</h1>
          <p className='display-4'>{props.description}</p>
          <img width='80px' height='80px' src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt="" />


        </div>
        <div className="card-footer text-muted">
          Have A Nice Day 😊
        </div>
      </div>
    </div>

  )
};

export default Weather