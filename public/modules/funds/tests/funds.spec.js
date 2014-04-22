'use strict';

(function() {
	// Funds Controller Spec
	describe('Funds Controller Tests', function() {
		// Initialize global variables
		var FundsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Funds controller.
			FundsController = $controller('FundsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fund object fetched from XHR', inject(function(Funds) {
			// Create sample Fund using the Funds service
			var sampleFund = new Funds({
				name: 'New Fund'
			});

			// Create a sample Funds array that includes the new Fund
			var sampleFunds = [sampleFund];

			// Set GET response
			$httpBackend.expectGET('funds').respond(sampleFunds);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.funds).toEqualData(sampleFunds);
		}));

		it('$scope.findOne() should create an array with one Fund object fetched from XHR using a fundId URL parameter', inject(function(Funds) {
			// Define a sample Fund object
			var sampleFund = new Funds({
				name: 'New Fund'
			});

			// Set the URL parameter
			$stateParams.fundId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/funds\/([0-9a-fA-F]{24})$/).respond(sampleFund);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fund).toEqualData(sampleFund);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Funds) {
			// Create a sample Fund object
			var sampleFundPostData = new Funds({
				name: 'New Fund'
			});

			// Create a sample Fund response
			var sampleFundResponse = new Funds({
				_id: '525cf20451979dea2c000001',
				name: 'New Fund'
			});

			// Fixture mock form input values
			scope.name = 'New Fund';

			// Set POST response
			$httpBackend.expectPOST('funds', sampleFundPostData).respond(sampleFundResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fund was created
			expect($location.path()).toBe('/funds/' + sampleFundResponse._id);
		}));

		it('$scope.update() should update a valid Fund', inject(function(Funds) {
			// Define a sample Fund put data
			var sampleFundPutData = new Funds({
				_id: '525cf20451979dea2c000001',
				name: 'New Fund'
			});

			// Mock Fund in scope
			scope.fund = sampleFundPutData;

			// Set PUT response
			$httpBackend.expectPUT(/funds\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/funds/' + sampleFundPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fundId and remove the Fund from the scope', inject(function(Funds) {
			// Create new Fund object
			var sampleFund = new Funds({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Funds array and include the Fund
			scope.funds = [sampleFund];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/funds\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFund);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.funds.length).toBe(0);
		}));
	});
}());