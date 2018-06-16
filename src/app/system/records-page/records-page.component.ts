import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/models/category.model';
import { CategoriesService } from '../shared/services/catigories.service';

@Component({
  selector: 'wfm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  private categories: Category[] = [];
  isLoaded: boolean = false;

  constructor(
    private categoryService: CategoriesService
  ) { }

  ngOnInit() {
    this.categoryService.getCatigories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategoryAdded(category: Category){
    this.categories.push(category);
  }

  categoryWasEdited(category: Category){
    const idx = this.categories
      .findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }
}
