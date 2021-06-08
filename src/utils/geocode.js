const request = require('request')

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3Vpcmlicm9qYXMiLCJhIjoiY2twNDc5bGZ5MDdrdjJxdDhxcGpuMzdkOCJ9.9D7leV0QSAaU02_sqPQdRg&limit=1'

	request({url, json: true}, (error, {body: data}) => {
		if (error) {
			callback('Error connecting to the Map service', undefined)
		} else if (!data.features[0]) {
			callback('Unknown location', undefined)
		} else {
			callback(undefined, {
				latitude:  data.features[0].center[1],
				longitude: data.features[0].center[0],
				location:  data.features[0].place_name
			})
		}
	})
}

module.exports = geocode