import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PlanningComponent } from './planning.component';

import { ConfigurationComponent } from './configuration/configuration.component';
import { CalendarModule } from 'angular-calendar';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  imports: [
    ThemeModule,
    CalendarModule.forRoot(),
    Ng2GoogleChartsModule
  ],
  declarations: [
    PlanningComponent,
    ConfigurationComponent,
  ],
})

export class PlanningModule { }
