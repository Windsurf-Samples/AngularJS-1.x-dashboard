import { downgradeInjectable } from '@angular/upgrade/static';
import * as angular from 'angular';
import { WidgetDataModelService } from './services/widget-data-model.service';
import { WidgetDefCollectionService } from './services/widget-def-collection.service';

angular.module('ui.dashboard')
  .factory('WidgetDataModelAngular', downgradeInjectable(WidgetDataModelService) as any)
  .factory('WidgetDefCollectionAngular', downgradeInjectable(WidgetDefCollectionService) as any);
