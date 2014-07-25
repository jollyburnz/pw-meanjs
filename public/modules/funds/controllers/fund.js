'use strict';

angular.module('funds').controller('FundController', ['$scope', '$filter', 'Funds', 'Companies', 'Articles',
    function($scope, $filter, Funds, Companies, Articles) {
		// Controller Logic 
		// ...
    // Find a list of Funds

    var dope = function(){
      var fund = $scope.fund_is;
      $scope.investedCapital = fund.investedCapital;
      $scope.mark = fund.mark;
      $scope.IRR = fund.IRR;
      $scope.multiple = fund.multiple;

      $scope.d_mark = fund.d_mark;
      $scope.d_IRR = fund.d_IRR;
      $scope.d_multiple = fund.d_multiple;

      $scope.b_mark = fund.b_mark;
      $scope.b_IRR = fund.b_IRR;
      $scope.b_multiple = fund.b_multiple;

      $scope.u_mark = fund.u_mark;
      $scope.u_IRR = fund.u_IRR;
      $scope.u_multiple = fund.u_multiple;

      $scope.activeState = fund.name;

      $scope.p = 'baseline'; //default on baseline

      Companies.query(function(companies) {
        console.log($scope.companies, 'companies', fund.name);
        $scope.companies = companies;
        $scope.filtered = $filter('filter')($scope.companies, {from_fund: fund.name}, true);

        $scope.$watch('filtered', function(){
          setTimeout(function(){
            $('.company-photo').imagefill({throttle:1000/60});
            $('.company-photo').fadeIn();
          }, 2000)
        });
      });

      Articles.query(function(articles){
        console.log(fund.name, articles, 'articles');

        $scope.articles = articles;

        var filter_articles = function(article){
          var filter = _.pluck($scope.filtered, '_id');
          for(var i = 0; i < filter.length; i++) {
            if (filter[i] === article.for_company) {
              return true;
            };
          }
        };
        $scope.filter_article = $filter('filter')($scope.articles, filter_articles);
        $scope.filter_keyupdates = $filter('filter')($scope.filter_article, {is_keyupdate: true});
        console.log($scope.filter_keyupdates,'asdf');

        $scope.$watch('filter_article', function(){
            setTimeout(function(){
              $('.article-photo').imagefill({throttle:1000/60});
              $('.article-photo').fadeIn();
            }, 2000)
        });


      });
    };

    $scope.forCompany = function(asdf){
      console.log(asdf,'forcompany');
      return;
    }

    Funds.query(function(funds) {
      console.log(funds);
      $scope.funds = funds;
      $scope.fund_is = funds[0];
      $scope.data_or_news = 'data';
      dope()
    });

    $scope.dropdowntest = function(){
      //console.log($scope.fund_is, $scope.fund_is.investedCapital);
      dope()
    };

    $scope.tab = function(fund) {
      console.log(fund._id, 'id');
      $scope.investedCapital = fund.investedCapital;
      $scope.mark = fund.mark;
      $scope.IRR = fund.IRR;
      $scope.multiple = fund.multiple;

      $scope.d_mark = fund.d_mark;
      $scope.d_IRR = fund.d_IRR;
      $scope.d_multiple = fund.d_multiple;

      $scope.b_mark = fund.b_mark;
      $scope.b_IRR = fund.b_IRR;
      $scope.b_multiple = fund.b_multiple;

      $scope.u_mark = fund.u_mark;
      $scope.u_IRR = fund.u_IRR;
      $scope.u_multiple = fund.u_multiple;

      $scope.activeState = fund.name;

      $scope.p = 'baseline'; //default on baseline

      Companies.query(function(companies) {
        console.log(companies);
        $scope.companies = companies;
        console.log($scope.companies, 'companies');
        console.log(fund._id);
        $scope.filtered = $filter('filter')($scope.companies, {from_fund: fund._id});
      });

    };

    $scope.isActive = function(fund){
      var active = (fund.name === $scope.activeState);
      return active;
    };

    $scope.projection = function(projection){
      console.log(projection);
      $scope.p = projection;
    };

    $scope.getProjection = function(){
      console.log($scope.p, 'projection');
      return $scope.p;
    };

    $scope.dataOrNews = function(arg){
      console.log(arg, 'adfasdf')
      $scope.data_or_news = arg;
    };

    $scope.newsdata_active = function(arg){
      var active = $scope.data_or_news;
      //console.log(active, arg, 'active');
      if (arg === active){
        return active;
      }
    };
	}
]);