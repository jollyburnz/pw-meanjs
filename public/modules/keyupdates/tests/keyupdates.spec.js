'use strict';

(function() {
	// Keyupdates Controller Spec
	describe('Keyupdates Controller Tests', function() {
		// Initialize global variables
		var KeyupdatesController,
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

			// Initialize the Keyupdates controller.
			KeyupdatesController = $controller('KeyupdatesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Keyupdate object fetched from XHR', inject(function(Keyupdates) {
			// Create sample Keyupdate using the Keyupdates service
			var sampleKeyupdate = new Keyupdates({
				name: 'New Keyupdate'
			});

			// Create a sample Keyupdates array that includes the new Keyupdate
			var sampleKeyupdates = [sampleKeyupdate];

			// Set GET response
			$httpBackend.expectGET('keyupdates').respond(sampleKeyupdates);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.keyupdates).toEqualData(sampleKeyupdates);
		}));

		it('$scope.findOne() should create an array with one Keyupdate object fetched from XHR using a keyupdateId URL parameter', inject(function(Keyupdates) {
			// Define a sample Keyupdate object
			var sampleKeyupdate = new Keyupdates({
				name: 'New Keyupdate'
			});

			// Set the URL parameter
			$stateParams.keyupdateId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/keyupdates\/([0-9a-fA-F]{24})$/).respond(sampleKeyupdate);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.keyupdate).toEqualData(sampleKeyupdate);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Keyupdates) {
			// Create a sample Keyupdate object
			var sampleKeyupdatePostData = new Keyupdates({
				name: 'New Keyupdate'
			});

			// Create a sample Keyupdate response
			var sampleKeyupdateResponse = new Keyupdates({
				_id: '525cf20451979dea2c000001',
				name: 'New Keyupdate'
			});

			// Fixture mock form input values
			scope.name = 'New Keyupdate';

			// Set POST response
			$httpBackend.expectPOST('keyupdates', sampleKeyupdatePostData).respond(sampleKeyupdateResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Keyupdate was created
			expect($location.path()).toBe('/keyupdates/' + sampleKeyupdateResponse._id);
		}));

		it('$scope.update() should update a valid Keyupdate', inject(function(Keyupdates) {
			// Define a sample Keyupdate put data
			var sampleKeyupdatePutData = new Keyupdates({
				_id: '525cf20451979dea2c000001',
				name: 'New Keyupdate'
			});

			// Mock Keyupdate in scope
			scope.keyupdate = sampleKeyupdatePutData;

			// Set PUT response
			$httpBackend.expectPUT(/keyupdates\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/keyupdates/' + sampleKeyupdatePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid keyupdateId and remove the Keyupdate from the scope', inject(function(Keyupdates) {
			// Create new Keyupdate object
			var sampleKeyupdate = new Keyupdates({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Keyupdates array and include the Keyupdate
			scope.keyupdates = [sampleKeyupdate];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/keyupdates\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleKeyupdate);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.keyupdates.length).toBe(0);
		}));
	});
}());