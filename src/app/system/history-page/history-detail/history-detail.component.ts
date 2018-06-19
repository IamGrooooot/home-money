import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { WFMEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/catigories.service';
import { EventsService } from '../../shared/services/events.service';

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: WFMEvent;
  category: Category;
  isLoaded: boolean = false;
  sub1: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.sub1 = this.route.params
      .pipe(
        mergeMap((params: Params) => this.eventsService.getEventById(params['id'])),
        mergeMap((event: WFMEvent) => {
          this.event = event;
          return this.categoriesService.getCategoryByID(event.category);
        })
      )
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }

  ngOnDestroy(){
    if(this.sub1)
      this.sub1.unsubscribe();
  }

}
