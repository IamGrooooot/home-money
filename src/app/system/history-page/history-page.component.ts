import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';
import * as moment from 'moment';

import { WFMEvent } from '../shared/models/event.model';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { CategoriesService } from '../shared/services/catigories.service';

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
  filteredEvents: WFMEvent[] = [];
  chartData = [];

  isFilterVisible = false;
  
  ngOnInit() {
    this.sub1 = Observable.call(
      combineLatest(
        this.catigoriesService.getCatigories(),
        this.eventsServise.getEvents()
      )
      .subscribe((data: [ Category[], WFMEvent[]]) => {
        this.categories = data[0];
        this.events = data[1];

        this.setOriginalEvents();
        this.calculateChartData();
        this.isLoaded = true;
      })
    );
  }

  private setOriginalEvents(){
    this.filteredEvents = this.events.slice();
  }

  calculateChartData() : void{
    this.chartData = [];
    this.categories.forEach((cat) => {
      const catEvents = this.filteredEvents.filter((e) => e.category === cat.id && e.type === "outcome");
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      })
    });
  }

  private toggleFilterVisibility(dir: boolean){
    this.isFilterVisible = dir;
  }

  openFilter(){
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });
    this.calculateChartData();
  }

  onFilterCancel(){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy(){
    if(this.sub1){
      this.sub1.unsubscribe();
    }
  }
}
