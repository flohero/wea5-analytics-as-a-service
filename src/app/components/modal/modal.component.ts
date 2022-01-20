import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title: string

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
  }

  @HostListener('document:keyup.Escape')
  close() {
    this.el.nativeElement.classList.add('hidden')
  }
}
