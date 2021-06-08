console.log('eai');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error')
const forecastMessage = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	errorMessage.textContent = ''
	forecastMessage.textContent = 'Fetching weather....'

	const location = search.value

	if(!location || location === '') {
		errorMessage.textContent = 'digitae pfvr'
		forecastMessage.textContent = ''
	 	console.log('Digitae porfavor')
		return
	}

	fetch('http://localhost:3000/weather?address=' + location)
	.then((response) => {
		response
		.json()
		.then((data) => {
			if(data.error){
				errorMessage.textContent = data.error
				forecastMessage.textContent = ''
			} else {
				errorMessage.textContent = 'Weather for ' + data.location
				forecastMessage.textContent = data.forecast
			}
		});
	});
});
