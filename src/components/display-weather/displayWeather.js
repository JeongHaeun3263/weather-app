import React from 'react';
import momenttz from 'moment-timezone'; // To handle timezome

import Card from '../card/card';
import './displayWeather.css';

const DisplayWeather = (props) => {
	const { currentWeatherData, sevendaysWeatherData } = props;

	return (
		<div className="section">
			<div className="current-weather">
				<div className="location">
					<h1>
						{currentWeatherData.name}, {currentWeatherData.sys.country}
					</h1>
					<h3>{momenttz().tz(sevendaysWeatherData.timezone).format('llll')}</h3>
				</div>
				<div className="main">
					<div className="main-image">
						<img
							src={`http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`}
							alt="weather"
						/>
						<span className="main-text">
							{currentWeatherData.weather[0].main}
						</span>
					</div>
					<h3>
						{`${Math.round(currentWeatherData.main.temp - 273.15)}C`}
						<sup>o</sup>
					</h3>
				</div>
				<div className="description">
					<span>
						Precipitation: {`${sevendaysWeatherData.daily[0].pop * 100}%`}
					</span>
					<span>Humidity: {`${currentWeatherData.main.humidity}%`}</span>
					<span>
						Wind: {`${Math.round(currentWeatherData.wind.speed * 10)}mph`}
					</span>
				</div>
			</div>
			<div className="sevendays-weather">
				{sevendaysWeatherData.daily.slice(1).map((dayWeather) => (
					<Card
						key={Math.random()}
						dayWeather={dayWeather}
						sevendaysWeatherData={sevendaysWeatherData}
					/>
				))}
			</div>
		</div>
	);
};

export default DisplayWeather;
