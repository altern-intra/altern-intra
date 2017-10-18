import { Component} from '@angular/core';

@Component({
	selector: 'ngx-planning-config',
  styleUrls: ['./configuration.component.scss'],
	templateUrl: 'configuration.component.html'
})
export class ConfigurationComponent {
  title: string;

  modes = [{
  	value: 'week',
  	name: 'Semaine'
  },
  {
  	value: 'month',
  	name: 'Mois'
  },
  {
  	value: 'year',
  	name: 'Année'
  }];

	constructor() {
		this.title = 'Configuration'
	}

	changeMode(mode) {
		console.log(mode)
	}

}