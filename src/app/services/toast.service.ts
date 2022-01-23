import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Toast, ToastType} from '../model/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts = new Subject<Toast>()

  constructor() { }

  sendToast(toast: Toast) {
    this.toasts.next(toast)
  }

  sendFine(message: string) {
    this.toasts.next({
      message: message,
      type: ToastType.Fine
    })
  }

  sendWarning(message: string) {
    this.toasts.next({
      message: message,
      type: ToastType.Warning
    })
  }

  sendError(message: string) {
    this.toasts.next({
      message: message,
      type: ToastType.Error
    })
  }
}
