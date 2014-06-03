'use strict';

(function() {
	// Updates Controller Spec
	describe('Updates Controller Tests', function() {
		// Initialize global variables
		var UpdatesController,
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

			// Initialize the Updates controller.
			UpdatesController = $controller('UpdatesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Update object fetched from XHR', inject(function(Updates) {
			// Create sample Update using the Updates service
			var sampleUpdate = new Updates({
				name: 'New Update'
			});

			// Create a sample Updates array that includes the new Update
			var sampleUpdates = [sampleUpdate];

			// Set GET response
			$httpBackend.expectGET('updates').respond(sampleUpdates);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.updates).toEqualData(sampleUpdates);
		}));

		it('$scope.findOne() should create an array with one Update object fetched from XHR using a updateId URL parameter', inject(function(Updates) {
			// Define a sample Update object
			var sampleUpdate = new Updates({
				name: 'New Update'
			});

			// Set the URL parameter
			$stateParams.updateId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/updates\/([0-9a-fA-F]{24})$/).respond(sampleUpdate);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.update).toEqualData(sampleUpdate);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Updates) {
			// Create a sample Update object
			var sampleUpdatePostData = new Updates({
				name: 'New Update'
			});

			// Create a sample Update response
			var sampleUpdateResponse = new Updates({
				_id: '525cf20451979dea2c000001',
				name: 'New Update'
			});

			// Fixture mock form input values
			scope.name = 'New Update';

			// Set POST response
			$httpBackend.expectPOST('updates', sampleUpdatePostData).respond(sampleUpdateResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Update was created
			expect($location.path()).toBe('/updates/' + sampleUpdateResponse._id);
		}));

		it('$scope.update() should update a valid Update', inject(function(Updates) {
			// Define a sample Update put data
			var sampleUpdatePutData = new Updates({
				_id: '525cf20451979dea2c000001',
				name: 'New Update'
			});

			// Mock Update in scope
			scope.update = sampleUpdatePutData;

			// Set PUT response
			$httpBackend.expectPUT(/updates\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/updates/' + sampleUpdatePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid updateId and remove the Update from the scope', inject(function(Updates) {
			// Create new Update object
			var sampleUpdate = new Updates({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Updates array and include the Update
			scope.updates = [sampleUpdate];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/updates\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleUpdate);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.updates.length).toBe(0);
		}));
	});
}());