angular.module('brokeFilters', []).filter('status', function() {
    return function(input) {
      return input ? '\u2713' + " Ok" : '\u2718' + " You're broke!";
    };
  }).filter('statusClass', function() {
    return function(input) {
      return input ? "bg-success" : "bg-danger";
    };
  });