'use strict';

//Articles service used to communicate Articles REST endpoints
angular.module('articles').directive('dropDown', function(){
  return{
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
              scope.article.image = InkBlobs[0].url; //this scope is for article.image
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
})
.directive('myBackgroundProfile', function () {
    return function (scope, element, attrs) {
            console.log(scope, attrs.myBackgroundProfile, 'directive');

            attrs.$observe('myBackgroundProfile', function(value) {
                if (value){
                  element.css({
                    'background-image': 'url(' + value + ')'
                });
                } else {
                    console.log('no value');
                    element.css({
                    'background-image': 'url(img/no_image.png)'
                });
                }
            });
    };
})
.directive('imagefill', ['$timeout', function(timer){
  return {
    restrict: 'A',
    link: function($scope, $elem, attrs){

      var hello = function(){
        $('.article-photo').imagefill();
        $('.article-photo').fadeIn();
      }
      timer(hello, 1000);

    }
  };
}]);
