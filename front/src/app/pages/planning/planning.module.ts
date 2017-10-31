import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PlanningComponent } from './planning.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CalendarModule } from 'angular-calendar';


@NgModule({
  imports: [
    ThemeModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    PlanningComponent,
    ConfigurationComponent,
  ],
})

export class PlanningModule { }
