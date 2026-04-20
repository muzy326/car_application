

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { bootstrapApplication } from '@angular/platform-browser';


import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';



bootstrapApplication(AppComponent, {
  ...appConfig,
  
  providers: [
    ...(appConfig.providers || []),
    
    
  ]
}).catch(err => console.error(err));