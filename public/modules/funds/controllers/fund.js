'use strict';

angular.module('funds').controller('FundController', ['$scope', '$rootScope', '$filter', '$location', 'Authentication', 'Funds', 'Companies', 'Articles',
    function($scope, $rootScope, $filter, $location, Authentication, Funds, Companies, Articles) {
		// Controller Logic 
		// ...
    // Find a list of Funds

    $scope.user = Authentication.user;
    if (!$scope.user) $location.path('/');

    var dope = function(){
      var fund = $scope.fund_is;

      $scope.updated = fund.updated;

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
      console.log(fund.name, 'fund.name');
      if (fund.name === 'Fund I'){
        $scope.total = $rootScope.totalFromFundI();
        $scope.totalev = $rootScope.evFromFundI();
        $scope.forcasted_u = $rootScope.totalFromFundI() * $scope.u_multiple;
        $scope.forcasted_b = $rootScope.totalFromFundI() * $scope.b_multiple;
        $scope.forcasted_d = $rootScope.totalFromFundI() * $scope.d_multiple;
      } else if (fund.name === 'Fund IA'){
        $scope.total = $rootScope.totalFromFundIA();
        $scope.totalev = $rootScope.evFromFundIA();
        $scope.forcasted = $rootScope.returnFundIA();
        $scope.forcasted_u = $rootScope.totalFromFundIA() * $scope.u_multiple;
        $scope.forcasted_b = $rootScope.totalFromFundIA() * $scope.b_multiple;
        $scope.forcasted_d = $rootScope.totalFromFundIA() * $scope.d_multiple;
      } else if (fund.name === 'Fund II'){
        $scope.total = $rootScope.totalFromFundII();
        $scope.totalev = $rootScope.evFromFundII();
        $scope.forcasted = $rootScope.returnFundII();
        $scope.forcasted_u = $rootScope.totalFromFundII() * $scope.u_multiple;
        $scope.forcasted_b = $rootScope.totalFromFundII() * $scope.b_multiple;
        $scope.forcasted_d = $rootScope.totalFromFundII() * $scope.d_multiple;
      }


      $scope.p = 'baseline'; //default on baseline

      Companies.query(function(companies) {
        console.log($scope.companies, 'companies', fund.name);
        $scope.companies = companies;
        $scope.filtered = $filter('filter')($scope.companies, {from_fund: fund.name}, true);
        $scope.filtered_news = $filter('filter')($scope.companies, {from_fund: fund.name, is_featured: true}, true);


        $scope.$watch('filtered', function(){
          setTimeout(function(){
            $('.company-photo').imagefill({throttle:1000/60});
            $('.company-photo').fadeIn();
          }, 2000)
        });

        Articles.query(function(articles){
          console.log(fund.name, articles, 'articles');
          var chunk;

          chunk = function(a, s) {
            var i, _i, _ref, _results;
            if (a.length === 0) {
              return [];
            } else {
              _results = [];
              for (i = _i = 0, _ref = a.length - 1; s > 0 ? _i <= _ref : _i >= _ref; i = _i += s) {
                _results.push(a.slice(i, +(i + s - 1) + 1 || 9e9));
              }
              return _results;
            }
          };

          $scope.articles = articles;

          var filter_articles = function(article){
            var filter = _.pluck($scope.filtered, 'name');
            for(var i = 0; i < filter.length; i++) {
              if (filter[i] === article.for_company.name) {
                return true;
              };
            }
          };

          $scope.filter_article = $filter('filter')($scope.articles, filter_articles);
          $scope.filter_keyupdates = $filter('filter')($scope.filter_article, {is_keyupdate: true});
          console.log($scope.filter_keyupdates,'asdf');

          $scope.$watch('filter_article', function(){
              $scope.rows = chunk($scope.filter_article, 3);
              console.log($scope.rows, 'filtered artilcesasdfasdf');
              setTimeout(function(){
                $('.article-photo').imagefill({throttle:1000/60});
                $('.article-photo').fadeIn();
              }, 2000)
          });
        });

      });

    };

    $scope.forCompany = function(asdf){
      console.log(asdf,'forcompany');
      return;
    }

    Funds.query(function(funds) {
      console.log(funds);
      $scope.data_or_news = 'data';
      $scope.funds = funds;

      if (typeof $rootScope.fund_is == "undefined") {
        $scope.fund_is = funds[0];
      } else {
        if ($rootScope.fund_is == 'Fund I'){
          $scope.fund_is = funds[0];
        } 
        else if ($rootScope.fund_is == 'Fund IA'){
          $scope.fund_is = funds[1];
        } 
        else {
          $scope.fund_is = funds[2];
        }
      }
      
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