import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ModulesComponent } from './modules/modules.component';
import { ProjectsComponent } from './projects/projects.component';
import { ActivitiesComponent } from './activities/activities.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    DashboardComponent,
    ModulesComponent,
    ProjectsComponent,
    ActivitiesComponent,
  ],
})

export class DashboardModule { }
