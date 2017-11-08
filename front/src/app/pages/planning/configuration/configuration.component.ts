import { Component, EventEmitter, Output} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
@Component({
	selector: 'ngx-planning-config',
  styleUrls: ['./configuration.component.scss'],
	templateUrl: 'configuration.component.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class ConfigurationComponent {
  menuState: string = 'out';
  burger: boolean = false;
  title: string;
  @Output() view: EventEmitter<any> = new EventEmitter();


  modes = [
  {
    value: 'day',
    name: 'Jour'
  },
  {
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

	changeMode(view) {
		this.view.emit(view);
	}

  toggleConfig() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.burger = !this.burger;
  }

}