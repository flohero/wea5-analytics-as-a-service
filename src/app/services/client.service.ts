import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Client} from "../model/client";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Array<Client>> {
    return this.httpClient.get<Array<Client>>(`${environment.url}/clients`)
  }

  createClient(): Observable<Client> {
    return this.httpClient.post(`${environment.url}/clients`, {})
      .pipe(map(res => res as Client))
  }
}
