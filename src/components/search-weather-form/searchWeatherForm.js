import React, { useState, useEffect } from 'react';
import { Link, Router } from 'react-router-dom';

import Result from '../display-weather/displayWeather';
import { api } from '../../api';
import './searchWeatherForm.css';

const SearchWeatherForm = (props) => {
	const [form, setForm] = useState({
		city: '',
		zipcode: '',
		countrycode: '',
	});
	const [currentWeatherData, setCurrentWeatherData] = useState(null);
	const [sevendaysWeatherData, setSevendaysWeatherData] = useState(null);
	const [isCityInputBoxVisible, setisCityInputBoxVisible] = useState(false);
	const [isZipCodeInputBoxVisible, setisZipCodeInputBoxVisible] =
		useState(false);
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	// comment out to check data format
	// useEffect(() => {
	// 	console.log(currentWeatherData, sevendaysWeatherData);
	// }, [currentWeatherData, sevendaysWeatherData]);

	// To get forecast for next seven days' data by using current weather's data
	useEffect(() => {
		if (currentWeatherData) {
			getSevenDaysData(currentWeatherData);
		}
	}, [currentWeatherData]);

	async function getSevenDaysData(currentWeatherData) {
		const { lat, lon } = currentWeatherData.coord;
		const sevenDaysData = await fetch(
			`${api.base}onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${api.key}`
		) //
			.then((res) => {
				if (!res.ok) {
					throw new Error();
				}
				return res;
			})
			.then((res) => {
				console.log('ok');
				return res.json();
			})
			.catch((error) => {
				console.log(error);
				setHasError(true);
			});

		setSevendaysWeatherData(sevenDaysData);
		setLoading(false);
	}

	async function getWeatherDataByCity(e) {
		e.preventDefault();

		const data = await fetch(
			`${api.base}weather?q=${form.city}&appid=${api.key}`
		) //
			.then((res) => {
				if (!res.ok) {
					throw new Error();
				}
				return res;
			})
			.then((res) => {
				console.log('ok');
				return res.json();
			})
			.catch((error) => {
				console.log(error);
				setHasError(true);
			});

		setLoading(true);
		setCurrentWeatherData(data);
		resetWeatherSearchForm();
	}

	async function getWeatherDataByZipCode(e) {
		e.preventDefault();

		const data = await fetch(
			`${api.base}weather?zip=${form.zipcode},${form.countrycode}&appid=${api.key}`
		) //
			.then((res) => {
				if (!res.ok) {
					throw new Error();
				}
				return res;
			})
			.then((res) => {
				console.log('ok');
				return res.json();
			})
			.catch((error) => {
				console.log(error);
				setHasError(true);
			});

		setLoading(true);
		setCurrentWeatherData(data);
		resetWeatherSearchForm();
	}

	const resetWeatherSearchForm = () => {
		setForm({
			city: '',
			zipcode: '',
			countrycode: '',
		});
	};

	const handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;

		if (name === 'city') {
			setForm({ ...form, city: value });
		}

		if (name === 'zipcode') {
			setForm({ ...form, zipcode: value });
		}

		if (name === 'countrycode') {
			setForm({ ...form, countrycode: value });
		}
	};

	const handleSearchByCity = () => {
		setisCityInputBoxVisible(true);
		setisZipCodeInputBoxVisible(false);
	};

	const handleSearchByZipCode = () => {
		setisZipCodeInputBoxVisible(true);
		setisCityInputBoxVisible(false);
	};

	return (
		<div className="section">
			<h1>Weather App</h1>
			<h3>search by...</h3>
			<div className="option__container">
				<button className="option__container--btn" onClick={handleSearchByCity}>
					City
				</button>
				<button
					className="option__container--btn"
					onClick={handleSearchByZipCode}
				>
					Zip Code
				</button>
			</div>

			<form className="search-form">
				<div className={`input ${isCityInputBoxVisible ? '' : 'hidden'}`}>
					<input
						type="text"
						name="city"
						value={form.city}
						placeholder="Enter city name"
						onChange={handleChange}
					/>
				</div>
				<div className={`input ${isZipCodeInputBoxVisible ? '' : 'hidden'}`}>
					<input
						type="text"
						name="zipcode"
						value={form.zipcode}
						placeholder="Enter zip code"
						onChange={handleChange}
					/>
					<input
						type="text"
						name="countrycode"
						value={form.countrycode}
						placeholder="Enter country code"
						onChange={handleChange}
					/>
				</div>

				{isCityInputBoxVisible || isZipCodeInputBoxVisible ? (
					<button
						onClick={
							isZipCodeInputBoxVisible
								? getWeatherDataByZipCode
								: getWeatherDataByCity
						}
					>
						Search
					</button>
				) : (
					''
				)}
			</form>

			{loading && <div className="loading"></div>}

			{hasError && (
				<button>
					<Router>
						<Link to="/">Try again</Link>
					</Router>
				</button>
			)}

			{sevendaysWeatherData && (
				<Result
					currentWeatherData={currentWeatherData}
					sevendaysWeatherData={sevendaysWeatherData}
				/>
			)}
		</div>
	);
};

export default SearchWeatherForm;
