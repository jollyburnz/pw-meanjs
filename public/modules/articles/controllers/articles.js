'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', '$filter', 'Authentication', 'Articles', 'Companies',
    function($scope, $stateParams, $location, $filter, Authentication, Articles, Companies) {
        $scope.authentication = Authentication;

        Companies.query(function(companies) {
          console.log(companies, 'companies');
          $scope.companies = companies;
        });

        // Create new Article
        $scope.create = function() {
        	// Create new Article object
            console.log(this.url, 'url');
            var article = new Articles({
                image: this.url,
                link: this.link,
                author: this.author,
                headline: this.headline,
                content: this.content,
                for_company: this.for_company,
                for_company_name: this.for_company.name,
                date_posted: this.date_posted,
                is_keyupdate: this.is_keyupdate
            });

            // Redirect after save
            article.$save(function(response) {
                $location.path('articles');
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
                $location.path('articles');
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

            Articles.query(function(articles){
                var excludethis = ($stateParams.articleId).toString();
                $scope.related = $filter('filter')(articles, {for_company:{name: $scope.article.for_company.name}, _id: '!'+excludethis});
            });
        };

        $scope.updateImage = function(){
            console.log('update image');
            filepicker.pick(function(InkBlob){
                console.log(InkBlob.url);
                $scope.article.image = InkBlob.url;
                $('#ArticleImage').html("<img src='" + $scope.article.image+ "' />");
            });
        }
    }
]);