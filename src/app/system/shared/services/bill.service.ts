import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Bill } from "../models/bill.model";
import { BaseApi } from "../../../shared/core/base-api";

@Injectable()
export class BillService extends BaseApi{
    
    private readonly UrlFixer: string = 'http://data.fixer.io/api/latest?access_key=f272f1ab81e55bee2396c6a559365531';

    constructor(
        public httpClient: HttpClient
    ){
        super(httpClient);
    }

    getBill() : Observable<Bill>{
        return this.get('bill');
    }

    getCurrency(base: string = 'RUB,USD') : Observable<any>{
        return this.httpClient.get<any>(this.UrlFixer + `&symbols=${base}`);
    }
}