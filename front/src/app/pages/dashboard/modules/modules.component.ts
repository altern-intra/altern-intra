import { Component } from '@angular/core';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'ngx-modules',
  styleUrls: ['./modules.component.scss'],
  templateUrl: './modules.component.html',
})

export class ModulesComponent {
  title: string;

  settings = {
  	actions: false,
    columns: {
      name: {
        title: 'Nom du module'
      },
      Actions: //or something
        {
          title:'Detail',
          type:'html',
          valuePrepareFunction:(cell,row)=>{
            return `<a class="register-button"><i title="S'inscrire" class="ion-checkmark"></i></a>`
          },
          filter:false       
        },
    },
    editor: {
    	config: {

    	}
    }
  	};

  	data = [
  	  {
  	    name: "B4 - Système Unix - Mémoire",
  	  },
  	  {
  	    name: "B4 - C++",
  	  },
  	  {
  	    name: "B4 - Écrits professionnels",
  	  },
  	  {
  	    name: "B4 - Prog Elem Appliquee",
  	  },
  	  {
  	    name: "B4 - Sécurité Web",
  	  },
  	  {
  	    name: "B4 - Système Unix - Concurrence",
  	  },
  	  {
  	    name: "B4 - Écrits professionnels",
  	  },
  	  {
  	    name: "B4 - Système Unix - Instrumentation",
  	  },
  	  {
  	    name: "B4 - C++ II",
  	  },
  	  {
  	    name: "B4 - Administration Système",
  	  },
  	  {
  	    name: "B4 - Systeme Unix - Réseau",
  	  },
  	];

  constructor(private table: Ng2SmartTableModule) {
  	this.title = 'Modules'
  }

}
