(function(){var r;r=angular.module("app.filters",[]),r.filter("isMilestone",function(){return function(r,e){var n;return n=Number(r.replace(/[^0-9\.]+/g,"")),n>=e&&(r="<mark>"+r+"</mark>"),r}})}).call(this);