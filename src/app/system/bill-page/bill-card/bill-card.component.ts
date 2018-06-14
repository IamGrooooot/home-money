import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../../shared/services/bill.service';
import { Observable, combineLatest, Subscription} from 'rxjs';

import { Bill } from '../../shared/models/bill.model';
@Component({
  selector: 'wfm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(
    private billService: BillService
  ) { }

  ngOnInit() {
    this.subscription = Observable.call(
      combineLatest(
        this.billService.getBill(),
        this.billService.getCurrency()
      ).subscribe((data:[Bill[], any]) =>{
        console.log(data);
      })
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
