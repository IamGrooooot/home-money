import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Bill } from "../models/bill.model";
import { map } from 'rxjs/operators';

@Injectable()
export class BillService{
    
    private readonly Url: string = 'http://localhost:3000/';
    private readonly UrlFixer: string = 'http://data.fixer.io/api/latest?access_key=f272f1ab81e55bee2396c6a559365531';

    constructor(
        private httpClient: HttpClient
    ){}

    getBill() : Observable<Bill[]>{
        return this.httpClient.get<Array<Bill>>(this.Url + 'bill');
    }

    getCurrency(base: string = 'RUB') : Observable<any>{
        return this.httpClient.get<any>(this.UrlFixer + `&symbols=${base}`);
    }
}