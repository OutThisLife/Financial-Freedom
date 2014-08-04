app = angular.module 'app.controllers', []
winObj = angular.element window

# ---------------------------------------------------------

app.controller 'MainController', ['$scope', '$timeout', ($scope, $timeout) ->
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

# ---------------------------------------------------------

app.controller 'Results', ['$scope', '$timeout', ($scope, $timeout) ->
	i = $scope.$index
	$scope.assetAdd = $scope.savingsAdd = 0

	$scope.getCash = ->
		$scope.result_cash = $scope.cash + (($scope.income * i) * $scope.perc('cash_perc'))

		if $scope.cashcap >= 1 and $scope.result_cash >= $scope.cashcap
			remove = parseInt $scope.result_cash - $scope.cashcap

			if $scope.assets
				$scope.assetAdd = remove * $scope.perc('asset_perc')

			if $scope.savings
				$scope.savingsAdd = remove * $scope.perc('saving_perc')

			$scope.cashcap

		else $scope.result_cash

	$scope.getAssets = ->
		$scope.result_assets = $scope.assetAdd
		$scope.result_assets += $scope.assets + (($scope.income * i) * $scope.perc('asset_perc'))
		$scope.result_assets += $scope.result_assets * ($scope.perc('appreciation') / 12)

	$scope.getSavings = ->
		$scope.result_savings = $scope.savingsAdd
		$scope.result_savings += $scope.savings + (($scope.income * i) * $scope.perc('saving_perc'))

	$scope.getTotal = ->
		$scope.result_total = $scope.getCash() + $scope.result_assets + $scope.result_savings + ($scope.income * i) - ($scope.expenses * i)
]