const fileKey = 'FpeOxjOK3CFQr0hVklY8OO5C';

function apiRequest(endpoint) {
	return fetch('https://api.figma.com/v1' + endpoint, {
		method: 'GET',
		headers: { "x-figma-token": config.PERSONAL_ACCESS_TOKEN }
	}).then(function(response) {
		return response.json();
	}).catch(function (error) {
		return { err: error };
	});
}

function callFigma() {
	showSpinner();
	apiRequest('/files/' + fileKey)
	.then(function (apiResponse) {
		hideSpinner();
		
		if (apiResponse.thumbnailUrl) {
			document.querySelector('img').src = apiResponse.thumbnailUrl;
		}
		if (apiResponse.name) {
			document.querySelector('h1').innerHTML = apiResponse.name;
		}
	});
}

function showSpinner() {
	console.log('Loading...');
}

function hideSpinner() {
	console.log('Here we are!');
}

callFigma();