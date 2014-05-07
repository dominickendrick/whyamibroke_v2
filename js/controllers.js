var brokeApp = angular.module('brokeApp', []);

brokeApp.controller('TransactionsListCtrl', ['$scope','$rootScope', '$http',
  function($scope, $http) {
    $http.get('data/transactions.json').success(function(data) {
      $scope.transactions = data;
      $rootScope.$broadcast('UPDATE_TRANSACTION_DATA', $scope.transactions);
    });
    $scope.orderProp = 'creationDate';
}]);

brokeApp.controller('LimitsListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('data/limits.json').success(function(data) {
      $scope.limits = data;
    });
    $scope.$on('UPDATE_TRANSACTION_DATA', function ( event, transactions ) { 
      
    });
    $scope.orderProp = 'creationDate';
    $scope
}]);

var checkLimit = function(limit, transaction){
  
}