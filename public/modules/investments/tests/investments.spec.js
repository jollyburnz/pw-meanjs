'use strict';

(function() {
	// Investments Controller Spec
	describe('Investments Controller Tests', function() {
		// Initialize global variables
		var InvestmentsController,
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

			// Initialize the Investments controller.
			InvestmentsController = $controller('InvestmentsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Investment object fetched from XHR', inject(function(Investments) {
			// Create sample Investment using the Investments service
			var sampleInvestment = new Investments({
				name: 'New Investment'
			});

			// Create a sample Investments array that includes the new Investment
			var sampleInvestments = [sampleInvestment];

			// Set GET response
			$httpBackend.expectGET('investments').respond(sampleInvestments);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.investments).toEqualData(sampleInvestments);
		}));

		it('$scope.findOne() should create an array with one Investment object fetched from XHR using a investmentId URL parameter', inject(function(Investments) {
			// Define a sample Investment object
			var sampleInvestment = new Investments({
				name: 'New Investment'
			});

			// Set the URL parameter
			$stateParams.investmentId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/investments\/([0-9a-fA-F]{24})$/).respond(sampleInvestment);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.investment).toEqualData(sampleInvestment);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Investments) {
			// Create a sample Investment object
			var sampleInvestmentPostData = new Investments({
				name: 'New Investment'
			});

			// Create a sample Investment response
			var sampleInvestmentResponse = new Investments({
				_id: '525cf20451979dea2c000001',
				name: 'New Investment'
			});

			// Fixture mock form input values
			scope.name = 'New Investment';

			// Set POST response
			$httpBackend.expectPOST('investments', sampleInvestmentPostData).respond(sampleInvestmentResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Investment was created
			expect($location.path()).toBe('/investments/' + sampleInvestmentResponse._id);
		}));

		it('$scope.update() should update a valid Investment', inject(function(Investments) {
			// Define a sample Investment put data
			var sampleInvestmentPutData = new Investments({
				_id: '525cf20451979dea2c000001',
				name: 'New Investment'
			});

			// Mock Investment in scope
			scope.investment = sampleInvestmentPutData;

			// Set PUT response
			$httpBackend.expectPUT(/investments\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/investments/' + sampleInvestmentPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid investmentId and remove the Investment from the scope', inject(function(Investments) {
			// Create new Investment object
			var sampleInvestment = new Investments({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Investments array and include the Investment
			scope.investments = [sampleInvestment];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/investments\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleInvestment);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.investments.length).toBe(0);
		}));
	});
}());