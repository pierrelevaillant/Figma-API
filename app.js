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

	apiRequest('/files/' + getFileKey())
	.then(function (apiResponse) {
		hideSpinner();
		
		if (apiResponse && apiResponse.thumbnailUrl) {
			document.querySelector('img').src = apiResponse.thumbnailUrl;
		}
		if (apiResponse && apiResponse.name) {
			document.querySelector('h1').innerHTML = apiResponse.name;
		}
	});
}

// index.html?fileKey=FpeOxjOK3CFQr0hVklY8OO5C (fileKey of your Figma's file)
function getFileKey() {
	var url_string = window.location.href;
	var url = new URL(url_string);

	if (url.searchParams.get("fileKey")) {
		var fileKey = url.searchParams.get("fileKey");
	} else {
		return;
	}

	return fileKey;
}

function showSpinner() {
	console.log('Loading...');
}

function hideSpinner() {
	console.log('Here we are!');
}

callFigma();