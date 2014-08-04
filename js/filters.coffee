app = angular.module 'app.filters', []

# Trust a resource
app.filter 'trust', ['$sce', ($sce) ->
	(src) -> $sce.trustAsResourceUrl src
]

# Newline to <br />
app.filter 'nl2br', -> (text) -> text.replace /\n/g, '<br />' if text?

# Reverse an object
app.filter 'reverse', -> (obj) -> obj.slice().reverse()

# Count an objects length
app.filter 'objLength', -> (obj) ->
	i = 1
	i++ for z of obj
	i

# Converts links to hyperlinkls
app.filter 'parseUrl', ->
	pattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi

	(text, target = '_blank') ->
		angular.forEach text.match(pattern), (url) ->
			text = text.replace url, "<a target=#{target} href=#{url}>#{url}</a>"
		text

# Highlight a million
app.filter 'isMillion', -> (currency) ->
	num = Number currency.replace /[^0-9\.]+/g, ''

	if num >= 100000
		currency = "<mark>#{currency}</mark>"

	currency