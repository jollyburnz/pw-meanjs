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
        $scope.filtered = $filter('filter')($scope.companies, {from_fund: fund.name }, true);
      });

      Articles.query(function(articles){
        console.log(fund.name, articles, 'articles');
        var filtered_companies = $scope.filtered;
        console.log(filtered_companies, 'filcomps');

        $scope.articles = articles;

        var dopetest = function(article){
          console.log('dope', article.for_company, filtered_companies);
        };

        $scope.filart = $filter('filter')($scope.articles, dopetest);
        console.log($scope.filart, 'filart');

        //$scope.filart = $filter('filter')($scope.articles, {for_company: {$in:{_id:"5371329fc2307d234a321ab7"}} }, true);
        //db.articles.find({for_company:{$in:[ObjectId("5371329fc2307d234a321ab7"), ObjectId("5369089c9a890fc2c2c27c69")]}})
        //$scope.filart = $filter('filter')(articles, {from_fund: fund.name }, true);
        //$filter('filter')(articles, {for_company: $stateParams.companyId});
      });
    };

    $scope.forCompany = function(asdf){
      console.log(asdf,'forcompany');
      return;
    }

    Funds.query(function(funds) {
      console.log(funds);
      $scope.funds = funds;
      $scope.fund_is = funds[2];
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
        $scope.filtered = $filter('filter')($scope.companies, {from_fund: fund._id });
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