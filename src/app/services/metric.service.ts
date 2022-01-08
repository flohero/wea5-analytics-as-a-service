import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  constructor(private client: HttpClient) { }

  findMetrics(name: string, from: Date, to: Date) {
    this.client.get(`${environment.url}/metrics?name=${name ?? ''}&from=${from ?? ''}&to=${to ?? ''}`)
  }
}
