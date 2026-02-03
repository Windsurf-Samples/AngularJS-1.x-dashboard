/**
 * Downgrade Module
 * 
 * This module handles the downgrading of Angular services and components
 * to make them available in AngularJS code.
 */

import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';

// Import Angular components and services
import { TestComponent } from './components';
import { 
  WidgetModelService,
  WidgetModel,
  DashboardStateService,
  DashboardState,
  WidgetDefCollectionService,
  WidgetDefCollection
} from './services';

/**
 * Register downgraded Angular services and components with AngularJS
 * 
 * This function should be called after the AngularJS module is defined
 * but before the application is bootstrapped.
 */
export function registerDowngradedProviders(): void {
  // Get the AngularJS module
  const appModule = angular.module('app');

  // Downgrade Angular services to AngularJS
  // These services can now be injected into AngularJS code
  
  // WidgetModelService - provides factory methods for creating WidgetModel instances
  appModule.factory('WidgetModelService', downgradeInjectable(WidgetModelService));
  
  // DashboardStateService - provides factory methods for creating DashboardState instances
  appModule.factory('DashboardStateService', downgradeInjectable(DashboardStateService));
  
  // WidgetDefCollectionService - provides factory methods for creating WidgetDefCollection instances
  appModule.factory('WidgetDefCollectionService', downgradeInjectable(WidgetDefCollectionService));

  // Downgrade Angular components to AngularJS directives
  // These components can now be used in AngularJS templates
  
  // TestComponent - test component to verify hybrid app is working
  appModule.directive('appTestComponent', downgradeComponent({
    component: TestComponent,
    inputs: ['message']
  }) as angular.IDirectiveFactory);
}

/**
 * Create Angular-compatible factory wrappers for the migrated services
 * 
 * These factories maintain backward compatibility with existing AngularJS code
 * that uses `new WidgetModel(...)` syntax by returning the class constructor.
 */
export function registerCompatibilityFactories(): void {
  const uiDashboardModule = angular.module('ui.dashboard');

  // Override the original WidgetModel factory with the Angular version
  // This returns the WidgetModel class so existing code using `new WidgetModel(...)` still works
  uiDashboardModule.factory('WidgetModelNg', ['WidgetModelService', function(widgetModelService: WidgetModelService) {
    return widgetModelService.getModelClass();
  }]);

  // Override the original DashboardState factory with the Angular version
  uiDashboardModule.factory('DashboardStateNg', ['DashboardStateService', function(dashboardStateService: DashboardStateService) {
    return dashboardStateService.getStateClass();
  }]);

  // Override the original WidgetDefCollection factory with the Angular version
  uiDashboardModule.factory('WidgetDefCollectionNg', ['WidgetDefCollectionService', function(widgetDefCollectionService: WidgetDefCollectionService) {
    return widgetDefCollectionService.getCollectionClass();
  }]);
}

// Export the classes for direct use in Angular code
export { WidgetModel, DashboardState, WidgetDefCollection };
