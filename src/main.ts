/**
 * Main entry point for the hybrid Angular/AngularJS application
 * 
 * This file bootstraps Angular first, then Angular bootstraps AngularJS
 * through the UpgradeModule.
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './angular-app/app.module';
import { registerDowngradedProviders, registerCompatibilityFactories } from './angular-app/downgrade.module';

// Declare global types for AngularJS
declare global {
  interface Window {
    angular: angular.IAngularStatic;
  }
}

/**
 * Bootstrap the hybrid application
 * 
 * The bootstrap process:
 * 1. Wait for AngularJS to be loaded (via script tags)
 * 2. Register downgraded Angular providers with AngularJS
 * 3. Bootstrap Angular
 * 4. Angular's AppModule.ngDoBootstrap() will bootstrap AngularJS
 */
function bootstrap(): void {
  // Ensure AngularJS is loaded
  if (typeof window.angular === 'undefined') {
    console.error('AngularJS is not loaded. Make sure angular.js is included before main.ts');
    return;
  }

  // Register downgraded providers with AngularJS
  // This must happen before Angular bootstraps
  try {
    registerDowngradedProviders();
    registerCompatibilityFactories();
  } catch (e) {
    console.warn('Could not register downgraded providers. AngularJS app module may not be defined yet.', e);
  }

  // Bootstrap Angular
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {
      console.log('Hybrid Angular/AngularJS application bootstrapped successfully');
    })
    .catch((err) => {
      console.error('Error bootstrapping hybrid application:', err);
    });
}

// Wait for DOM to be ready
if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
