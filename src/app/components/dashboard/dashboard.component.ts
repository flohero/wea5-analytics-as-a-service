import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.auth.login()
  }

  loggedIn(): boolean {
    return this.auth.isLoggedIn()
  }

  logout() {
    this.auth.logout()
  }
}
