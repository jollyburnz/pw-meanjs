'use strict';

angular.module('companies')

.directive('dropDown', [
	function() {
		return {
			scope: false,
	    link: function(scope, element, attrs){
	      console.log(scope, element, attrs, 'woah');
	      filepicker.makeDropPane(element[0], {
	          dragEnter: function() {
	              $("#exampleDropPane").html("Drop to upload").css({
	                  'backgroundColor': "#E0E0E0",
	                  'border': "1px solid #000"
	              });
	          },
	          dragLeave: function() {
	              $("#exampleDropPane").html("Drop files here").css({
	                  'backgroundColor': "#F6F6F6",
	                  'border': "1px dashed #666"
	              });
	          },
	          onSuccess: function(InkBlobs) {
	              $("#exampleDropPane").text("Done, see result below");
	              console.log(InkBlobs[0].url);
	              scope.url = InkBlobs[0].url;
	              scope.company.image = InkBlobs[0].url; //this scope is for edit company.image
	              $('#exampleDropPane').html("<img src='" +scope.url+ "' />");
	              //$("#localDropResult").text(JSON.stringify(InkBlobs));
	          },
	          onError: function(type, message) {
	              $("#localDropResult").text('('+type+') '+ message);
	          },
	          onProgress: function(percentage) {
	              $("#exampleDropPane").text("Uploading ("+percentage+"%)");
	          }
	      });
	    }
		};
	}
])
.directive('myBackgroundImage', function () {
    return function (scope, element, attrs) {
    		console.log(scope);
    		setTimeout( function(){
	        element.css({
	            'background-image': 'url(' + attrs.myBackgroundImage + ')'
	        });
	      }, 1000);
    };
});

