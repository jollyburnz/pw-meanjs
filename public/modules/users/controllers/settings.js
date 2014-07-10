'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$filter', '$http', '$location', 'Users', 'Authentication', 'Dropbox', 'Wires', 'Funds',
	function($scope, $filter, $http, $location, Users, Authentication, Dropbox, Wires, Funds) {
		$scope.user = Authentication.user;

		// Dropbox Authentication
		//window.asdf = Dropbox;

		// if (!(asdf.isAuthenticated())){
		// 	asdf.authenticate();
			//console.log(asdf.isAuthenticated());
		//}

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

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
			var firstname = Authentication.user.firstName;
			var lastname = Authentication.user.lastName;
			console.log(firstname, lastname, 'name');

			// Hit PW API for User's files
			$http.get('/files/gobook.pdf').success(function(response) {
				// If successful download resulting file
				console.log('Got response from Server sending files');

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

		//edit profile
    $scope.updateProfileImage = function(){
      console.log('update image');
      filepicker.pick(function(InkBlob){
        console.log(InkBlob.url);
        $scope.user.profile = InkBlob.url;
        $('#UserProfile').html("<img src='" + $scope.user.profile + "' />");
      });
  	};

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

    Wires.query(function(wires) {
      console.log(wires, 'wires', $scope.user._id);
      $scope.wiresFromFund1 = $filter('filter')(wires, {fund: '5368052de1fa0517b9c9583a', lp: $scope.user._id});
      $scope.wiresFromFund1a = $filter('filter')(wires, {fund: '536906eb0e5071d7bee81f81', lp: $scope.user._id});
      $scope.wiresFromFund2 = $filter('filter')(wires, {fund: '536906d40e5071d7bee81f80', lp: $scope.user._id});
    });

    $scope.gotoFund = function(fund_is) {
    	//console.log(fund_is, 'fund_is');

    	Funds.query(function(funds){
    		console.log(funds, fund_is);
    		var test = $filter('filter')(funds, {name: fund_is}, true);
    		console.log(test[0].name, 'asdfasdfas');
    	});
    	$location.path("fund");
    }

		$scope.test = function(a) {
			console.log('test');
			// asdf.readFile('a', {root:'dropbox'}).then(function(data){
			// 	console.log('yes');
			// }, function(error){
			// 	console.log(error, 'error');
			// });
			// asdf.readFile(a, function(err, data){
			// 	if (err) {
			// 		console.log(err);
			// 	} else {
			// 		return true;
			// 	}
			// });
		};
	}
]);