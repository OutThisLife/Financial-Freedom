(function(){var s,e;s=angular.module("app.controllers",[]),e=angular.element(window),s.controller("MainController",["$scope","$timeout",function(s,n){var t;return t=function(){return s.$apply(function(){return s.scrollTop=document.body.scrollTop||document.documentElement.scrollTop})},n(t),e.on("scroll resize orientationchange",t),s.cash=3300,s.cashcap=5e3,s.savings=5e3,s.assets=9e3,s.income=8e3,s.expenses=3e3,s.months=12,s.appreciation="8%",s.cash_perc="70%",s.asset_perc="20%",s.saving_perc="10%",s.range=function(e){return null==e&&(e=parseInt(s.months)),Array(e)},s.perc=function(e){return parseInt(s[e])/100},s.isFilledIn=function(){return s.cash&&s.savings&&s.assets&&s.income&&s.expenses}}]),s.controller("Results",["$scope","$timeout",function(s){var e;return e=s.$index,s.assetAdd=s.savingsAdd=0,s.getCash=function(){var n;return s.result_cash=s.cash+s.income*e*s.perc("cash_perc"),s.cashcap>=1&&s.result_cash>=s.cashcap?(n=parseInt(s.result_cash-s.cashcap),s.assets&&(s.assetAdd=n*s.perc("asset_perc")),s.savings&&(s.savingsAdd=n*s.perc("saving_perc")),s.cashcap):s.result_cash},s.getAssets=function(){return s.result_assets=s.assetAdd,s.result_assets+=s.assets+s.income*e*s.perc("asset_perc"),s.result_assets+=s.result_assets*(s.perc("appreciation")/12)},s.getSavings=function(){return s.result_savings=s.savingsAdd,s.result_savings+=s.savings+s.income*e*s.perc("saving_perc")},s.getTotal=function(){return s.result_total=s.getCash()+s.result_assets+s.result_savings+s.income*e-s.expenses*e}}])}).call(this);