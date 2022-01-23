import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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
