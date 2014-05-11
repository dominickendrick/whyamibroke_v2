var brokeControllers = angular.module('brokeControllers', []);

brokeControllers.controller('TransactionsListCtrl', ['$rootScope', '$scope','$http',
  function($rootScope, $scope, $http) {
	$scope.transactions = {};
    $http.get('data/transactions.json').success(function(data) {
      $scope.transactions = data;
      $rootScope.$broadcast('UPDATE_TRANSACTION_DATA', $scope.transactions);
    });
    $scope.orderProp = 'creationDate';
    
    $scope.update = function(transaction) {
        $scope.transactions.push(transaction)
        $rootScope.$broadcast('UPDATE_TRANSACTION_DATA', $scope.transactions);
		$scope.transaction = null;
    };
}]);

brokeControllers.controller('LimitsListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.$on('UPDATE_TRANSACTION_DATA', function ( event, transactions ) { 
      $http.get('data/limits.json').success(function(data) {
        var results = data.map(getLimit, transactions);
        $scope.limits = results;
      });
    });
    $scope.orderProp = 'creationDate';
}]);

function getLimit(limit){
  var data = checkLimit(limit, this);
  return angular.extend(data, limit);
}

function checkLimit(limit, transactions){  
    var total = totalCost(transactions.filter(checkType, limit), "amount");
    var remaining = limit.threashold - total;
    return {
      "id" : hashId(limit.account + limit.threashold + limit.type),
      "total": total,
      "remaining" : remaining,
      "statusOk" : remaining > 0
    }
}

function hashId(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

function checkType(value){
  return value.hasOwnProperty("type") && value.type === this.type
}

function totalCost(transactions, key){
  if (transactions.length > 1){
   return transactions.reduce(function(total, obj){
	  return total + obj[key];
    },0);
  } else {
   return transactions[0][key]
  }
}