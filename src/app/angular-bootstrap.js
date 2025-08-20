(function() {
  'use strict';

  console.log('Initializing Angular-style components for hybrid demo...');

  function TimeWidgetController($scope, $interval) {
    var vm = this;
    vm.time = new Date().toLocaleTimeString();
    
    var timeInterval = $interval(function() {
      vm.time = new Date().toLocaleTimeString();
    }, 500);
    
    $scope.$on('$destroy', function() {
      if (timeInterval) {
        $interval.cancel(timeInterval);
      }
    });
  }

  function ScopeWatchWidgetController() {
    var vm = this;
  }

  function FluidWidgetController($scope) {
    var vm = this;
    vm.width = 'auto';
    vm.height = 'auto';
    
    $scope.$on('widgetResized', function(event, size) {
      vm.width = size.width || vm.width;
      vm.height = size.height || vm.height;
    });
  }

  angular.module('app')
    .directive('wtTimeAngular', function() {
      return {
        restrict: 'E',
        template: '<div>Time (Angular-style)<div class="alert alert-success">{{vm.time}}</div></div>',
        controller: TimeWidgetController,
        controllerAs: 'vm',
        scope: {}
      };
    })
    .directive('wtScopeWatchAngular', function() {
      return {
        restrict: 'E',
        template: '<div>Value (Angular-style)<div class="alert alert-info">{{vm.value || "No value"}}</div></div>',
        controller: ScopeWatchWidgetController,
        controllerAs: 'vm',
        scope: {
          value: '='
        },
        bindToController: true
      };
    })
    .directive('wtFluidAngular', function() {
      return {
        restrict: 'E',
        template: '<div>Fluid Widget (Angular-style)<div class="alert alert-warning">Width: {{vm.width}}, Height: {{vm.height}}</div></div>',
        controller: FluidWidgetController,
        controllerAs: 'vm',
        scope: {}
      };
    });

  console.log('Angular-style components registered successfully');
})();
