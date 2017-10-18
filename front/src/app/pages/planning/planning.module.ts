import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PlanningComponent } from './planning.component';
import { ConfigurationComponent } from './configuration/configuration.component';


@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    PlanningComponent,
    ConfigurationComponent,
  ],
})

export class PlanningModule { }
