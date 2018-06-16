import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { Observable, combineLatest, Subscription} from 'rxjs';

import { Bill } from '../shared/models/bill.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  private sub1: Subscription;
  private sub2: Subscription;

  private currency: any;
  private bill: Bill;
  private isLoaded: boolean = false;

  constructor(
    private billService: BillService
  ) { }
  ngOnInit() {
    this.sub1 = Observable.call(
      combineLatest(
        this.billService.getBill(),
        this.billService.getCurrency()
      ).subscribe((data:[Bill, any]) => {
        this.bill = data[0];
        this.currency = data[1];
        this.isLoaded = true;
      })
    );
  }

  onRefresh(){
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
      .pipe(
        delay(1000)
      )
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      })
  }

  ngOnDestroy(){
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
