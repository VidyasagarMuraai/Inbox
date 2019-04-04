import {
    NgModule
  } from '@angular/core';
  import { HttpClientModule } from '@angular/common/http';
  
  import {SOAPHandlerService} from './soap-handler.service';
  
  @NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [SOAPHandlerService]
  })
  export class SOAPHandlerModule {
    
  }
  
  
  