/**
 * Angular App Module
 * 
 * This is the root Angular module for the hybrid application.
 * It uses UpgradeModule to bootstrap alongside AngularJS.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { CommonModule } from '@angular/common';

// Components
import { TestComponent } from './components';

// Services
import { 
  WidgetModelService,
  DashboardStateService,
  WidgetDefCollectionService
} from './services';

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    UpgradeModule
  ],
  providers: [
    WidgetModelService,
    DashboardStateService,
    WidgetDefCollectionService
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}

  /**
   * Bootstrap the hybrid application
   * This method is called from main.ts after Angular bootstraps
   */
  ngDoBootstrap(): void {
    // Bootstrap AngularJS
    this.upgrade.bootstrap(document.body, ['app'], { strictDi: true });
  }
}
