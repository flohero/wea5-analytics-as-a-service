import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar-item',
  template: '<li class="inline ml-6 link-animation cursor-pointer"><a [routerLink]="route">{{text}}</a></li>',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent implements OnInit {

  @Input() text: string = ""
  @Input() route: string = ""

  ngOnInit(): void {
  }

}
