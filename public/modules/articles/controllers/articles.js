'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
    function($scope, $stateParams, $location, Authentication, Articles) {
        $scope.authentication = Authentication;

        // Create new Article
        $scope.create = function() {
        	// Create new Article object
            var article = new Articles({
                image: this.image,
                link: this.link,
                author: this.author,
                content: this.content
            });

            // Redirect after save
            article.$save(function(response) {
                $location.path('articles/' + response._id);
            });

            // Clear form fields
            this.name = '';
        };

        // Remove existing Article
        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function() {
                    $location.path('articles');
                });
            }
        };

        // Update existing Article
        $scope.update = function() {
            var article = $scope.article;

            article.$update(function() {
                $location.path('articles/' + article._id);
            });
        };

        // Find a list of Articles
        $scope.find = function() {
            Articles.query(function(articles) {
                $scope.articles = articles;
            });
        };

        // Find existing Article
        $scope.findOne = function() {
            Articles.get({
                articleId: $stateParams.articleId
            }, function(article) {
                $scope.article = article;
            });
        };
    }
]);