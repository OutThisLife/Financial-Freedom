app = angular.module 'app.controllers', []
winObj = angular.element window

app.controller 'MainCtrl', ['$scope', '$timeout', ($scope, $timeout) ->
	setDimensions = ->
		$scope.$apply ->
			$scope.scrollTop = document.body.scrollTop || document.documentElement.scrollTop

	$timeout setDimensions
	winObj.on 'scroll resize orientationchange', setDimensions

	# --

	$scope.cash = 3300
	$scope.cashcap = 5000
	$scope.savings = 5000
	$scope.assets = 9000
	$scope.income = 8000
	$scope.expenses = 3000
	$scope.months = 12

	$scope.appreciation = '8%'
	$scope.cash_perc = '70%'
	$scope.asset_perc = '20%'
	$scope.saving_perc = '10%'

	$scope.range = (n = parseInt($scope.months)) -> new Array n
	$scope.perc = (key) -> parseInt($scope[key]) / 100

	$scope.isFilledIn = ->
		$scope.cash and $scope.savings and $scope.assets and $scope.income and $scope.expenses
]