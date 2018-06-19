import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Category } from "../models/category.model";
import { BaseApi } from "../../../shared/core/base-api";

@Injectable()
export class CategoriesService extends BaseApi{
    constructor(public httpClient: HttpClient) {
        super(httpClient);
    }

    addCategory(category: Category): Observable<Category>{
        return this.post('categories', category);
    }

    getCatigories(): Observable<Category[]>{
        return this.get('categories');
    }

    updateCategory(category: Category): Observable<Category>{
        return this.put(`categories/${category.id}`, category);
    }

    getCategoryByID(id: number): Observable<Category>{
        return this.get(`categories/${id}`)
    } 
}