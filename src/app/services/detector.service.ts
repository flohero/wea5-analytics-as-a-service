import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Detector} from "../model/detector";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DetectorService {

  constructor(private httpClient: HttpClient) { }

  findAllDetectors(): Observable<Array<Detector>> {
    return this.httpClient.get<Array<Detector>>(`${environment.url}/detectors`)
  }
}
