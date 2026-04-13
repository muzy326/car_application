

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { bootstrapApplication } from '@angular/platform-browser';


import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';
import { AuthGuard } from './app/components/guards/auth.guard';


bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    AuthGuard
    
  ]
}).catch(err => console.error(err));