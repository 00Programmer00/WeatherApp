angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http) {
  $scope.fav = true;
  $scope.notFav = false;

  $scope.add = function() {
    var data = $scope.city;
    $http.post('https://still-fortress-79314.herokuapp.com/add',{"city":data}).
    success(function(data) {
      console.log("posted successfully");
    }).error(function(data) {
      console.error("error in posting");
    });
    $scope.notFav = true;
    $scope.fav = false;
  };

  $scope.delete = function () {
    var data = $scope.city;
    $http.post('https://still-fortress-79314.herokuapp.com/delete',{"city":data}).
    success(function(data) {
      console.log("posted successfully");
    }).error(function(data) {
      console.error("error in posting");
    });
    $scope.notFav = false;
    $scope.fav = true;
  };

  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth()+1;
  if(dd<10) {
    dd='0'+dd
  }
  if(mm<10) {
    mm='0'+mm
  }
  date = dd+'/'+mm;
  $scope.today = date;

  var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };
  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

  function onSuccess(position) {
    $http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude +"&lon=" + position.coords.longitude +"&appid=88042bf9cbe3801286109c2851e70dc6&units=metric")
      .then(function(response) {
        $scope.ico = "http://openweathermap.org/img/w/"+response.data.weather[0].icon+".png";
        $scope.temp = Math.round(response.data.main.temp_max);
        $scope.city = response.data.name;
    });
  }
  function onError(error) {
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  }

  $scope.search = function() {
    var city = document.getElementById("search");
    $http.get("http://api.openweathermap.org/data/2.5/weather?q="+city.value+"&appid=88042bf9cbe3801286109c2851e70dc6&units=metric")
      .then(function (response) {
        $scope.ico = "http://openweathermap.org/img/w/"+response.data.weather[0].icon+".png";
        $scope.temp = Math.round(response.data.main.temp_max);
        $scope.city = response.data.name;
    });

  }
})

.controller('ChatsCtrl', function($scope, Chats, $http, $timeout) {
    // $window.location.reload(true);
  $scope.doRefresh = function() {
    console.log('Refreshing!');
    $timeout( function() {
      $http.get("https://still-fortress-79314.herokuapp.com/favorites").then(function (response) {
        $scope.favCities = response.data;
      });
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');

    }, 1000);
  };

    $http.get("https://still-fortress-79314.herokuapp.com/favorites").then(function (response) {
      $scope.favCities = response.data;
    });



})

.controller("getCityByName", function ($scope, $http, $stateParams) {
  // $scope.chat = Chats.get($stateParams.name);
  console.log($stateParams.city);
  $http.get("http://api.openweathermap.org/data/2.5/weather?q="+$stateParams.city+"&appid=88042bf9cbe3801286109c2851e70dc6&units=metric")
    .then(function (response) {
      $scope.ico = "http://openweathermap.org/img/w/"+response.data.weather[0].icon+".png";
      $scope.temp = Math.round(response.data.main.temp_max);
      $scope.city = response.data.name;
    });

  $scope.delete = function () {
    var data = $scope.city;
    $http.post('https://still-fortress-79314.herokuapp.com/delete',{"city":data}).
    success(function(data) {
      console.log("posted successfully");
    }).error(function(data) {
      console.error("error in posting");
    });
    $scope.notFav = false;
    $scope.fav = true;
  };
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth()+1;
  if(dd<10) {
    dd='0'+dd
  }
  if(mm<10) {
    mm='0'+mm
  }
  date = dd+'/'+mm;
  $scope.today = date;


});
