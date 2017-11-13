import { ConfigurationComponent } from './configuration/configuration.component'

import { CustomDateFormatter } from './custom-date-formatter.provider';

import { TimerObservable } from "rxjs/observable/TimerObservable";

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarDateFormatter,
  CalendarEventTimesChangedEvent,
  DAYS_OF_WEEK
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#D64541',
    secondary: '#D24D57'
  },
  blue: {
    primary: '#4183D7',
    secondary: '#22A7F0'
  },
  yellow: {
    primary: '#F9BF3B',
    secondary: '#F9BF3B'
  }
};

@Component({
  selector: 'ngx-planning',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['planning.component.scss'],
  templateUrl: 'planning.component.html',
  providers: [{
   provide: CalendarDateFormatter,
   useClass: CustomDateFormatter
}]
})

export class PlanningComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  locale: string = 'fr';

  view: string = 'week';

  viewDate: Date = new Date();

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  timelineChartData =  {
    chartType: 'Timeline',
    dataTable: [
    [ '\0'                                 ,  'Maintenant'                            ,  new Date(), new Date() ],
    [ 'B4 - Système Unix - Mémoire'        ,  'Malloc'                                ,  new Date(2017, 0, 23), new Date(2017, 1, 12) ],
    [ 'B4 - C++'                           ,  'NanoTekSpice'                          ,  new Date(2017, 0, 23), new Date(2017, 2, 5)  ],
    [ 'B4 - Écrits professionnels'         ,  'Mission délicate: recadrer un collègue',  new Date(2017, 1, 6), new Date(2017, 1, 19) ],
    [ 'B4 - Prog Elem Appliquee / Projet'  ,  'Trade'                                 ,  new Date(2017, 0, 30), new Date(2017, 5, 11) ],
    [ 'B4 - Écrits professionnels'         ,  'Diaporama pour décrocher 1M$'          ,  new Date(2017, 1, 20), new Date(2017, 2, 5)  ],
    [ 'B4 - Sécurité Web'                  ,  'SHODAN Call For Paper'                 ,  new Date(2017, 1, 12), new Date(2017, 4, 3)  ],
    [ 'B4 - Système Unix - Mémoire'        ,  'nm/objdump'                            ,  new Date(2017, 1, 13), new Date(2017, 1, 26) ],
    [ 'B4 - Sécurité Web'                  ,  'SHODAN'                                ,  new Date(2017, 1, 13), new Date(2017, 2, 12) ],
    [ 'B4 - Système Unix - Concurrence'    ,  'Philosophes'                           ,  new Date(2017, 2, 6) , new Date(2017, 2, 19) ],
    [ 'B4 - Écrits professionnels'         ,  'Rédiger un bilan d\'expérience'        ,  new Date(2017, 2, 6) , new Date(2017, 2, 26) ],
    [ 'B4 - C++'                           ,  'Arcade'                                ,  new Date(2017, 2, 6) , new Date(2017, 3, 9)  ],
    [ 'B4 - Système Unix - Concurrence'    ,  'LemIPC'                                ,  new Date(2017, 2, 20), new Date(2017, 3, 2)  ],
    [ 'B4 - Système Unix - Instrumentation',  'strace'                                ,  new Date(2017, 3, 3) , new Date(2017, 3, 16) ],
    [ 'B4 - C++ II'                        ,  'The Plazza'                            ,  new Date(2017, 3, 10), new Date(2017, 3, 30) ],
    [ 'B4 - Système Unix - Instrumentation',  'ftrace'                                ,  new Date(2017, 3, 17), new Date(2017, 4, 7)  ],
    [ 'B4 - C++ II'                        ,  'Indie Studio'                          ,  new Date(2017, 4, 1) , new Date(2017, 5, 11) ],
    [ 'B4 - Systeme Unix - Réseau'         ,  'MyFTP'                                 ,  new Date(2017, 4, 8) , new Date(2017, 4, 21) ],
    [ 'B4 - Administration Système'        ,  'Projet My NAS'                         ,  new Date(2017, 4, 15), new Date(2017, 5, 18) ],
    [ 'B4 - Systeme Unix - Réseau'         ,  'MyIRC'                                 ,  new Date(2017, 4, 22), new Date(2017, 5, 11) ],
    [ 'B4 - Systeme Unix - Réseau'         ,  'Zappy'                                 ,  new Date(2017, 4, 29), new Date(2017, 6, 2)  ],
  ]  ,
    options: {
      'title': 'Planning annuel',
      'height': 700
    },
  };


  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 3),
      title: 'A 3 day event',
      color: colors.red,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;
  newHeight: number;

  constructor(private modal: NgbModal) {
    this.newHeight = this.timelineChartData.dataTable.length * 25;
    console.log(this.newHeight)
    this.timelineChartData.options.height = this.newHeight;

  }

  ngOnInit() {
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  onChange(event) {
    this.view = event;
  }
}