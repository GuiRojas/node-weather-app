const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=ee7fb952587186d2f4886012ac46a3da&query=' + latitude + ',' + longitude

	request({url, json: true }, (error, {body}) => {
		if (error) {
			callback('Error connecting to the Weather service', undefined)
		} else if(body.error) {
			callback('Unable to find location', undefined)
		} else {
			const data = body.current
			callback(undefined, data.weather_descriptions[0] + '. Temperature:' + data.temperature + '. Feelslike: ' + data.feelslike + '.')
		}
	})	
}

module.exports = forecast