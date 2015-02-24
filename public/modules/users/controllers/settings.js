'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$rootScope', '$filter', '$http', '$location', 'Users', 'Authentication', 'Dropbox', 'Wires', 'Funds',
	function($scope, $rootScope, $filter, $http, $location, Users, Authentication, Dropbox, Wires, Funds) {
		$scope.user = Authentication.user;

		// Dropbox Authentication
		//window.asdf = Dropbox;

		// if (!(asdf.isAuthenticated())){
		// 	asdf.authenticate();
			//console.log(asdf.isAuthenticated());
		//}

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

    if($rootScope.disclosure){
      $scope.disclosureRead = true;
    }

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};
		
		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function() {
  		$scope.success = $scope.error = null;
  		var user = new Users($scope.user);

  		user.$update(function(response) {
  			console.log(response, 'response');
  			$scope.success = true;
  			Authentication.user = response;
        $location.path('settings/overview')
  		}, function(response) {
  			$scope.error = response.data.message;
  		});
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		$scope.upload = function() {
			alert('upload');
		};

		$scope.dropbox = function() {

      console.log("trying to download files")

			// Hit PW API for User's files
			$http.get('/files/' + Authentication.user._id).success(function(response) {
				// If successful download resulting file
				console.log('Got response from Server sending files', response);
				console.log("response.files[0]", response.files[0]);
        
        $scope.files = response.files;

        //window.open(response.files[0]);
			}).error(function(response) {
				console.log('Error requesting files from server');
			});

			/*
			
			var path = "4 - Investors/"+firstname+" "+lastname;
			asdf.metadata(path).then(function(data) {
				console.log(data, 'woah');
				$scope.path = data.path;
				$scope.accts = data.contents;
     		}, function(error) {
      			console.log(error, 'error');
      		});
			*/
		};

    $scope.download = function(f){
      $http.get('/download/' + f);
    }

    $scope.accept = function(){
      console.log('accept');
      $rootScope.disclosure = 'yes';
      $scope.disclosureRead = true;
      console.log($scope.disclosureRead);
    }

		//edit profile
    $scope.updateProfileImage = function(){
      console.log('update image');
      filepicker.pick(function(InkBlob){
        console.log(InkBlob.url);
        $scope.user.profile = InkBlob.url;
        $('#UserProfile').html("<img src='" + $scope.user.profile + "' />");
      });
  	};

  	Funds.query(function(funds){
  		var fund_i = $filter('filter')(funds, {name: 'Fund I'}, true);
  		var fund_ia = $filter('filter')(funds, {name: 'Fund IA'}, true);
  		var fund_ii = $filter('filter')(funds, {name: 'Fund II'}, true);

  		$scope.fund_i_multiple = fund_i[0].multiple;
  		$scope.fund_ia_multiple = fund_ia[0].multiple;
  		$scope.fund_ii_multiple = fund_ii[0].multiple;
	  });

	  Wires.query(function(wires) {
      console.log(wires, 'wires', $scope.user._id);
      $scope.wiresFromFund1 = $filter('filter')(wires, {fund: 'Fund I', lp: $scope.user._id}, true);
      $scope.wiresFromFund1a = $filter('filter')(wires, {fund: 'Fund IA', lp: $scope.user._id}, true);
      $scope.wiresFromFund2 = $filter('filter')(wires, {fund: 'Fund II', lp: $scope.user._id}, true);
    });

		$scope.toggleFund1 = function(obj) {
			console.log(obj, $(obj.target), 'obj');
			if ($scope.custom1 == false){
				console.log('false');
				$(obj.target).removeClass('glyphicon-plus')
				$(obj.target).addClass('glyphicon-minus')
			} else {
				console.log('true');
				$(obj.target).removeClass('glyphicon-minus')
				$(obj.target).addClass('glyphicon-plus')
			}

      $scope.custom1 = $scope.custom1 === false ? true: false;
    };

		$scope.toggleFund1a = function(obj) {
			console.log(obj, $(obj.target), 'obj');
			if ($scope.custom1a == false){
				console.log('false');
				$(obj.target).removeClass('glyphicon-plus')
				$(obj.target).addClass('glyphicon-minus')
			} else {
				console.log('true');
				$(obj.target).removeClass('glyphicon-minus')
				$(obj.target).addClass('glyphicon-plus')
			}

      $scope.custom1a = $scope.custom1a === false ? true: false;
    };

		$scope.toggleFund2 = function(obj) {
			console.log(obj, $(obj.target), 'obj');
			if ($scope.custom2 == false){
				console.log('false');
				$(obj.target).removeClass('glyphicon-plus')
				$(obj.target).addClass('glyphicon-minus')
			} else {
				console.log('true');
				$(obj.target).removeClass('glyphicon-minus')
				$(obj.target).addClass('glyphicon-plus')
			}

      $scope.custom2 = $scope.custom2 === false ? true: false;
    };

    $scope.gotoFund = function(fund_is) {
    	//console.log(fund_is, 'fund_is');
      $rootScope.fund_is = fund_is;
    	$location.path("fund");
    };

    $rootScope.totalFromFundI = function(){
    	var totalNumber = 0;
    	for(var i=0; i<$scope.wiresFromFund1.length; i++){
    		totalNumber = totalNumber + $scope.wiresFromFund1[i].amount
    	}
    	return totalNumber;
    };

    $rootScope.totalFromFundIA = function(){
    	var totalNumber = 0;
    	for(var i=0; i<$scope.wiresFromFund1a.length; i++){
    		totalNumber = totalNumber + $scope.wiresFromFund1a[i].amount
    	}
    	return totalNumber;
    };

    $rootScope.totalFromFundII = function(){
    	var totalNumber = 0;
    	for(var i=0; i<$scope.wiresFromFund2.length; i++){
    		totalNumber = totalNumber + $scope.wiresFromFund2[i].amount
    	}
    	return totalNumber;
    };

    $scope.total = function(){
    	var total = $scope.totalFromFundI() + $scope.totalFromFundIA() + $scope.totalFromFundII();
    	return total;
    };

    $scope.totalEV = function(){
    	var total = $scope.evFromFundI() + $scope.evFromFundIA() + $scope.evFromFundII();
    	return total;
    };

    $rootScope.evFromFundI = function(){
    	var total;
    	total = $scope.totalFromFundI();
    	return total*$scope.fund_i_multiple;
    };

    $rootScope.evFromFundIA = function(){
    	var total;
    	total = $scope.totalFromFundIA();
    	return total*$scope.fund_ia_multiple;
    };

    $rootScope.evFromFundII = function(){
    	var total;
    	total = $scope.totalFromFundII();
    	return total*$scope.fund_ii_multiple;
    };

    $rootScope.returnFundI = function(){
      var ev = $scope.evFromFundI();
      var total = $scope.totalFromFundI();
      var ret = (((ev - total) / total)*100).toFixed(2);

      if(total == 0){
        return 0;
      } else {
        return ret;
      };
    };

    $rootScope.returnFundIA = function(){
      var ev = $scope.evFromFundIA();
      var total = $scope.totalFromFundIA();
      var ret = (((ev - total) / total)*100).toFixed(2);
      if(total = 0){
        return 0;
      } else {
        return ret;
      };
    };

    $rootScope.returnFundII = function(){
      var ev = $scope.evFromFundII();
      var total = $scope.totalFromFundII();
      var ret = (((ev - total) / total)*100).toFixed(2);
      console.log(ev, total, ret);
      if(total = 0){
        return 0;
      } else {
        return ret;
      };
    };

    $rootScope.accruedInterest = function(){
      var all_wires = $scope.wiresFromFund1.concat($scope.wiresFromFund2)
      var result = 0

      all_wires.forEach(function(wire){
        var diff_in_years = (new Date() - new Date(wire.date)) / (1000 * 60 * 60 * 24 * 365);
        result = result + wire.amount * 0.08 * diff_in_years;
      })

      return result;
    }

    $scope.offsetDate = function(date){
      var localDate = new Date(date);
      var localTime = localDate.getTime();
      var localOffset = localDate.getTimezoneOffset() * 60000;
      return new Date(localTime + localOffset);
    };
	}
]);