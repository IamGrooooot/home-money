import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { WFMEvent } from '../../shared/models/event.model';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];

  types = [
    {
      type: 'income',
      label: 'Доход'
    },
    {
      type: 'outcome',
      label: 'Расход'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    let { amount, description, category, type } = form.value;
    if (amount < 0){
      amount *= -1;
    }

    const event = new WFMEvent(
      type, amount, +category, moment().format('DD.MM.YYYYY HH:mm:ss'), description
    );
  }
}
