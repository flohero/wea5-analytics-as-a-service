import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static readonly METRIC_CHARTS: string = 'metric_charts'

  constructor() {
  }

  public get<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    if (item) {
      return JSON.parse(item)
    }
    return null
  }

  public set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
