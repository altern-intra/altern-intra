import { Component, EventEmitter, Output} from '@angular/core';

@Component({
	selector: 'ngx-planning-config',
  styleUrls: ['./configuration.component.scss'],
	templateUrl: 'configuration.component.html'
})
export class ConfigurationComponent {
  title: string;
  @Output() mode: EventEmitter<any> = new EventEmitter();


  modes = [{
  	value: 'basicWeek',
  	name: 'Semaine'
  },
  {
  	value: 'month',
  	name: 'Mois'
  },
  {
  	value: 'timelineYear',
  	name: 'Année'
  }];

	constructor() {
		this.title = 'Configuration'
	}

	changeMode(mode) {
    console.log(mode);
		this.mode.emit(mode);
	}

}