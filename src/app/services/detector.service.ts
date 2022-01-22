import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Detector} from "../model/detector";
import {map, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DetectorService {

  constructor(private httpClient: HttpClient) {
  }

  findAllDetectors(): Observable<Array<Detector>> {
    return this.httpClient.get<Array<Detector>>(`${environment.url}/detectors`)
  }

  public isHeartbeatDetector(detector: Detector): boolean {
    return detector.metricName.toLowerCase().endsWith('heartbeat')
  }

  public deleteDetector(detector: Detector): Observable<Object | string> {
    if (this.isHeartbeatDetector(detector) || !detector || detector.id < 1) {
      return throwError(() => 'could not delete detector')
    }
    return this.httpClient.delete<Object>(`${environment.url}/detectors/${detector.id}`)
      .pipe(map(res => {
        console.log(res)
        return res
      }))
  }

  public createDetector(detector: Detector): Observable<Object> {
    return this.httpClient.post(`${environment.url}/detectors`, detector)
  }
}
