'use strict';

(function() {
	// Wires Controller Spec
	describe('Wires Controller Tests', function() {
		// Initialize global variables
		var WiresController,
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

			// Initialize the Wires controller.
			WiresController = $controller('WiresController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Wire object fetched from XHR', inject(function(Wires) {
			// Create sample Wire using the Wires service
			var sampleWire = new Wires({
				name: 'New Wire'
			});

			// Create a sample Wires array that includes the new Wire
			var sampleWires = [sampleWire];

			// Set GET response
			$httpBackend.expectGET('wires').respond(sampleWires);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.wires).toEqualData(sampleWires);
		}));

		it('$scope.findOne() should create an array with one Wire object fetched from XHR using a wireId URL parameter', inject(function(Wires) {
			// Define a sample Wire object
			var sampleWire = new Wires({
				name: 'New Wire'
			});

			// Set the URL parameter
			$stateParams.wireId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/wires\/([0-9a-fA-F]{24})$/).respond(sampleWire);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.wire).toEqualData(sampleWire);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Wires) {
			// Create a sample Wire object
			var sampleWirePostData = new Wires({
				name: 'New Wire'
			});

			// Create a sample Wire response
			var sampleWireResponse = new Wires({
				_id: '525cf20451979dea2c000001',
				name: 'New Wire'
			});

			// Fixture mock form input values
			scope.name = 'New Wire';

			// Set POST response
			$httpBackend.expectPOST('wires', sampleWirePostData).respond(sampleWireResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Wire was created
			expect($location.path()).toBe('/wires/' + sampleWireResponse._id);
		}));

		it('$scope.update() should update a valid Wire', inject(function(Wires) {
			// Define a sample Wire put data
			var sampleWirePutData = new Wires({
				_id: '525cf20451979dea2c000001',
				name: 'New Wire'
			});

			// Mock Wire in scope
			scope.wire = sampleWirePutData;

			// Set PUT response
			$httpBackend.expectPUT(/wires\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/wires/' + sampleWirePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid wireId and remove the Wire from the scope', inject(function(Wires) {
			// Create new Wire object
			var sampleWire = new Wires({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Wires array and include the Wire
			scope.wires = [sampleWire];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/wires\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleWire);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.wires.length).toBe(0);
		}));
	});
}());