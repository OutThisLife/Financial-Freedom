var app;app=angular.module("app.directives",[]),app.directive("ngResult",function(){return{restrict:"EA",scope:!0,link:function(s,e,t){var a;return a=parseInt(t.ngResult),s.assetAdd=s.savingsAdd=0,s.getCash=function(){var e;return s.result_cash=s.cash+s.income*a*s.perc("cash_perc"),s.cashcap>=1&&s.result_cash>=s.cashcap?(e=parseInt(s.result_cash-s.cashcap),s.assets&&(s.assetAdd=e*s.perc("asset_perc")),s.savings&&(s.savingsAdd=e*s.perc("saving_perc")),s.cashcap):s.result_cash},s.getAssets=function(){return s.result_assets=s.assetAdd,s.result_assets+=s.assets+s.income*a*s.perc("asset_perc"),s.result_assets+=s.result_assets*(s.perc("appreciation")/12)},s.getSavings=function(){return s.result_savings=s.savingsAdd,s.result_savings+=s.savings+s.income*a*s.perc("saving_perc")},s.getTotal=function(){return s.result_total=s.getCash()+s.result_assets+s.result_savings+s.income*a-s.expenses*a}}}});