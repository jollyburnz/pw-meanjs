'use strict';

angular.module('users')
.filter('hidess', function(){
	return function(text){
		return text.replace(/\d{3}-?\d{2}-?/, '*** - ** - ');
	}
});