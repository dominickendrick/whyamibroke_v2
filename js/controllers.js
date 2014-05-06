var brokeApp = angular.module('brokeApp', []);

brokeApp.controller('TransactionsListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('data/transactions.json').success(function(data) {
      $scope.transactions = data;
    });
    $scope.orderProp = 'creationDate';
}]);
