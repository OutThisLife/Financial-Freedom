app = angular.module 'app.directives', []

app.directive 'ngResult', ->
	restrict: 'EA'
	scope: true
	link: ($scope, el, attrs) ->
		i = parseInt attrs.ngResult
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