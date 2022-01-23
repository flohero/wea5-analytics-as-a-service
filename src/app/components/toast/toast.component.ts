import {Component, ElementRef, OnInit} from '@angular/core';
import {ToastService} from '../../services/toast.service';
import {Toast} from '../../model/toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  toasts = this.toastService.toasts
  toast: Toast
  timeout: number | null

  constructor(private toastService: ToastService,
              private el: ElementRef) {

  }

  ngOnInit(): void {
    this.toasts.subscribe(toast => {
      this.toast = toast
      this.el.nativeElement.classList.remove('fade-out')
      this.el.nativeElement.classList.add('fade-in')
      if(this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.el.nativeElement.classList.remove('fade-in')
        this.el.nativeElement.classList.add('fade-out')
      }, 4000)
    })
  }

}
