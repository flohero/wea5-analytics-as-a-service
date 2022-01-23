import { Injectable } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) { }

  login(): boolean {
    this.oauthService.initImplicitFlow()
    return true
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
  }

  logout() {
    this.oauthService.logOut()
  }
}
