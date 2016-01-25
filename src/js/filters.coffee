app = angular.module 'app.filters', []

# ---------------------------------------------------------

app.filter 'isMilestone', -> (currency, milestone) ->
	return currency unless typeof(currency) is 'number'

	num = Number currency.replace /[^0-9\.]+/g, ''
	currency = "<mark>#{currency}</mark>" if num >= milestone
	currency