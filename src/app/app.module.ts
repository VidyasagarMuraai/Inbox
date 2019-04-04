import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SOAPHandlerService } from './cordysServices/soap-handler.service'
import {SOAPHandlerModule} from './cordysServices/soap-hander.module'
import {LoginComponent} from './login/login.component'
import { LoginModule } from './login/login.module';
import {DashboardModule} from './dashboard/dashboard.module'
import {PortalModule} from './layout/portal.module';



@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SOAPHandlerModule,
    LoginModule,
    DashboardModule,
    PortalModule,
  

  ],
  providers: [SOAPHandlerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
