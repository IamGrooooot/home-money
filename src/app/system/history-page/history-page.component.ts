import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../shared/services/catigories.service';
import { EventsService } from '../shared/services/events.service';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { WFMEvent } from '../shared/models/event.model';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy{

  sub1: Subscription;

  constructor(
    private catigoriesService: CategoriesService,
    private eventsServise: EventsService
  ) { }

  isLoaded = false;
  categories: Category[] = [];
  events: WFMEvent[] = [];
  chartData = [];
  
  ngOnInit() {
    this.sub1 = Observable.call(
      combineLatest(
        this.catigoriesService.getCatigories(),
        this.eventsServise.getEvents()
      )
      .subscribe((data: [ Category[], WFMEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];

        this.calculateChartData();
        this.isLoaded = true;
      })
    );
  }

  calculateChartData() : void{
    this.chartData = [];
    this.categories.forEach((cat) => {
      const catEvents = this.events.filter((e) => e.category === cat.id && e.type === "outcome");
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      })
    });
  }

  ngOnDestroy(){
    if(this.sub1){
      this.sub1.unsubscribe();
    }
  }
}
