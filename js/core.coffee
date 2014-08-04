# Require JS config.
requirejs.config
	baseUrl: 'js/'

	paths:
		# CDN powered
		angular: ['//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.min']
		sanitize: ['//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.16/angular-sanitize.min']

		# Local
		controllers: ['controllers']
		services: ['services']
		directives: ['directives']
		filters: ['filters']

	shim:
		angular: exports: 'angular'
		controllers: ['angular']
		services: ['angular']
		directives: ['angular']
		filters: ['angular']
		sanitize: ['angular']

	priority: ['angular']

require [
	'angular',
	'sanitize',
	'controllers',
	'directives',
	'filters',
], (angular) ->
	angular.element(document).ready ->
		angular.module 'app', [
			'ngSanitize',
			'app.controllers',
			'app.directives',
			'app.filters',
		]

		angular.bootstrap document, ['app']