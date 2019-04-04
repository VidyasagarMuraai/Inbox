import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PortalComponent} from './layout/portal.component';

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: '',
    redirectTo:'/login',
    pathMatch: 'full'
    
  },
  {
    path: 'portal',
    component:PortalComponent,
    
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
