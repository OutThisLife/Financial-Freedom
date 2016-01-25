app = angular.module 'app.controllers', []
winObj = angular.element window

# ---------------------------------------------------------

app.controller 'MainController', ['$scope', ($scope) ->
	$scope.months = 36

	$scope.income = 5600
	$scope.expenses = 2860

	$scope.savings = 8254
	$scope.saving_perc = '15%'

	$scope.assets = 0
	$scope.asset_perc = '85%'

	# --

	$scope.range = (n = parseFloat($scope.months)) -> new Array n
	$scope.perc = (key) -> parseFloat($scope["#{key}_perc"]) / 100
]

# ---------------------------------------------------------

app.controller 'Results', ['$scope', ($scope) ->
	savings = assets = excess = 0

	net = -> parseFloat($scope.income - $scope.expenses) * ($scope.$index + 1)

	$scope.r_savings = ->
		savings = parseFloat $scope.savings
		savings += net() * $scope.perc('saving')

		savings_cap = parseFloat $scope.expenses * 3

		if savings > savings_cap
			excess = parseFloat savings - savings_cap
			savings = parseFloat savings_cap

		savings

	$scope.r_assets = ->
		assets = parseFloat $scope.assets
		assets += excess
		assets += net() * $scope.perc('asset')

	$scope.r_worth = -> savings + assets
]