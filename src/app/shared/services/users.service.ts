import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../models/user.model";
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService{

    private readonly Url: string = 'http://localhost:3000/';

    constructor(private httpClient: HttpClient){}

    getUserByEmail(email: string): Observable<User>{
        return this.httpClient.get<Array<User>>(this.Url + `users?email=${email}`)
        .pipe(
            map((user: User[]) => user[0] ? user[0] : undefined)
        );
    }
}