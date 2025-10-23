import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { WidgetDataModelService } from './services/widget-data-model.service';
import { WidgetDefCollectionService } from './services/widget-def-collection.service';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [
    WidgetDataModelService,
    WidgetDefCollectionService
  ]
})
export class AppModule {
  ngDoBootstrap() {
  }
}
