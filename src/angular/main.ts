import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';
import { setAngularJSGlobal } from '@angular/upgrade/static';
import { AppModule } from './app.module';
import * as angular from 'angular';

import './downgrade-adapters';

setAngularJSGlobal(angular);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(platformRef => {
    const upgrade = platformRef.injector.get(UpgradeModule);
    upgrade.bootstrap(document.documentElement, ['app'], { strictDi: false });
    console.log('Hybrid Angular/AngularJS app bootstrapped successfully');
  })
  .catch(err => console.error('Error bootstrapping hybrid app:', err));
