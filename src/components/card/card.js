import React from 'react';
import moment from 'moment'; // To handle time format
import momenttz from 'moment-timezone'; // To handle timezone

import './card.css';

const Card = (props) => {
	const { dayWeather, sevendaysWeatherData } = props;

	return (
		<div className="card">
			<h3>
				{momenttz
					.tz(moment.unix(dayWeather.dt), sevendaysWeatherData.timezone)
					.format('dddd')}
			</h3>
			<img
				src={`http://openweathermap.org/img/wn/${dayWeather.weather[0].icon}@2x.png`}
				alt="weather"
			/>
			<span>
				{`${Math.round(dayWeather.temp.max - 273.15)}C`} <sup>o</sup>/
				{` ${Math.round(dayWeather.temp.min - 273.15)}C`} <sup>o</sup>
			</span>
		</div>
	);
};

export default Card;
