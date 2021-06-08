const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather app',
		name: 'cueio'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'Sobreu',
		name: 'eu'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'ajuda o veio',
		name: 'eu',
		paragraph: 'como fazer site bonito com css: sei não'
	});
});

app.get('/weather', (req, res) => {
	const address = req.query.address;

	if(!address) {
		res.send({
			error: 'missing param: ´address´'
		});
		return;
	};

	geocode(address, (geocodeError, {latitude, longitude, location} = {}) => {
		if(geocodeError) {
			res.send({
				error: geocodeError
			});
			return;
		};

		forecast(latitude, longitude, (forecastError, response) => {
			if(forecastError) {
				res.send({
					error: forecastError
				});
				return;
			};

			res.send({
				forecast: response,
				location,
				address
			});
			return;
		});
	});
});

app.get('/products', (req, res) => {
	if(!req.query.search) {
		res.send({
			error: 'missing param: ´search´'
		});
		return;
	};

	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.send('n existe ajuda pra isso não men');
});

app.get('*', (req, res) => {
	res.render('404', {
		title: 'quebro quebro',
		name: 'entidade',
		error: 'nao existe'
	});
});


app.listen(3000, () => {
	console.log('Up and running! port: 3000');
});
