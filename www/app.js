var myApp = angular.module('myApp')

myApp.controller('MainController', function($scope, DataService){
    $scope.data = DataService.getData();
    
    $scope.clearTotal = function(){
        $scope.data.total = 0;    
        DataService.save($scope.data);
    };
    
    $scope.add = function(name){
        if(name == 'dbz'){
            $scope.data.dbz++;
        } else if (name== 'xj'){
            $scope.data.xj++;
        } else if (name== 'wsz'){
            $scope.data.wsz++;
        } else if (name== 'qf'){
            $scope.data.qf++;
        }        
        DataService.save($scope.data);
    };
    
    $scope.minus = function(name){
        if(name == 'dbz'){
            $scope.data.dbz--;
        } else if (name== 'xj'){
            $scope.data.xj--;
        } else if (name== 'wsz'){
            $scope.data.wsz--;
        } else if (name== 'qf'){
            $scope.data.qf--;
        }
        DataService.save($scope.data);
    };
    
    $scope.dbz = function(){
        var options = {
          animation: 'slide'
        };
        myNavigator.pushPage("dbz.html", options);
    };
    
    $scope.xj = function(){
        var options = {
          animation: 'slide'
        };
        myNavigator.pushPage("xinjing.html", options);
    };
    
    $scope.wsz = function(){
        var options = {
          animation: 'slide'
        };
        myNavigator.pushPage("wsz.html", options);
    };
    
    $scope.qf = function(){
        var options = {
          animation: 'slide'
        };
        myNavigator.pushPage("qf.html", options);
    };
    
});

myApp.controller('DbzController', function($scope, DataService){
    $scope.data = DataService.getData();
    $scope.add = function(){
      $scope.data.dbz++;
      DataService.save($scope.data);
    };    
});

myApp.controller('XjController', function($scope, DataService){
    $scope.data = DataService.getData();
    $scope.add = function(){
      $scope.data.xj++;
      DataService.save($scope.data);
    };    
});

myApp.controller('WszController', function($scope, DataService){
    $scope.data = DataService.getData();
    $scope.add = function(){
      $scope.data.wsz++;
      DataService.save($scope.data);
    };    
});

myApp.controller('QfController', function($scope, DataService){
    $scope.data = DataService.getData();
    $scope.add = function(){
      $scope.data.qf++;
      DataService.save($scope.data);
    };    
});

myApp.service('DataService', function(localStorage){
    var myData = 'myData';
    this.data = localStorage.get(myData);
    if(!this.data){
      this.data = {
            total: 0,
            dbz:0,
            xj:0,
            wsz:0,
            qf:0};
    }
    
    this.getData = function(){
        return this.data;    
    };
    
    this.save= function(data){
        this.data = data;
        checkTotal(this.data);
        localStorage.add(myData, this.data);
    };
    
    checkTotal = function(data){
        if(data.dbz == 27 && data.xj == 49 && data.wsz == 84 && data.qf == 87){
            data.total++;
            data.dbz = 0;
            data.xj = 0;
            data.wsz = 0;
            data.qf = 0;            
        }
    }
    
    return this;
});


myApp.service('localStorage', function($window){

  var store = $window.localStorage;

  var add = function(key, value){
    value = angular.toJson(value);
    store.setItem(key, value);
  };

  var get = function(key){
    var value = store.getItem(key);
    if(value){
      value = angular.fromJson(value);
    }
    return value;
  };

  var remove = function(key){
    store.removeItem(key);
  };

  return {
    add: add,
    get: get,
    remove: remove
  };

});