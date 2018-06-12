import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user.model";

@Injectable()
export class UsersService{

    private readonly Url: string = 'http://localhost:3000/';

    constructor(private http: HttpClient){}

    getUserByEmail(email: string){
        return this.http.get<User>(this.Url + `users?email=${email}`);
    }
}