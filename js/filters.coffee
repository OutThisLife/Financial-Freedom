app = angular.module 'app.filters', []

# ---------------------------------------------------------

app.filter 'isMilestone', -> (currency, milestone) ->
	num = Number currency.replace /[^0-9\.]+/g, ''

	if num >= milestone
		currency = "<mark>#{currency}</mark>"

	currency