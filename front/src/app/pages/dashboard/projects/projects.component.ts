import { Component } from '@angular/core';

import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'ngx-projects',
  styleUrls: ['./projects.component.scss'],
  templateUrl: './projects.component.html',
})

export class ProjectsComponent {
  title: string;

  settings = {
  	actions: false,
    columns: {
      module_name: {
        title: 'Nom du module'
      },
      name: {
        title: 'Nom du projet'
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
        name:'Malloc',
  	    module_name: "B4 - Système Unix - Mémoire",
  	  },
  	  {
        name:'NanoTekSpice',
  	    module_name: "B4 - C++",
  	  },
  	  {
        name:'Avocat du diable',
  	    module_name: "B4 - Écrits professionnels",
  	  },
  	  {
        name:'Algori',
  	    module_name: "B4 - Prog Elem Appliquee",
  	  },
  	  {
        name:'Sécubitch',
  	    module_name: "B4 - Sécurité Web",
  	  },
  	  {
        name:'Philosophes',
  	    module_name: "B4 - Système Unix - Concurrence",
  	  },
  	  {
        name:'3 emails',
  	    module_name: "B4 - Écrits professionnels",
  	  },
  	  {
        name:'ftrace',
  	    module_name: "B4 - Système Unix - Instrumentation",
  	  },
  	  {
        name:'Indie studio',
  	    module_name: "B4 - C++ II",
  	  },
  	  {
        name:'MyCloud',
  	    module_name: "B4 - Administration Système",
  	  },
  	  {
        name:'Zappy',
  	    module_name: "B4 - Systeme Unix - Réseau",
  	  },
  	];

  constructor(private table: Ng2SmartTableModule) {
  	this.title = 'Projets'
  }

}
