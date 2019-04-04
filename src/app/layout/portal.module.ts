import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import {AppRoutingModule} from '../app-routing.module';
import {LmsMaterialModule} from '../lms-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
@NgModule({
  declarations: [PortalComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    LmsMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ChartModule,
  ]
})
export class PortalModule { }
