angular.element(document).ready ->
	angular.module 'app', [
		'ngSanitize',
		'app.controllers',
	]

	angular.bootstrap document, ['app']