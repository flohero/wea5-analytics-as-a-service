import {Injectable} from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from '../auth.config';
import {ToastService} from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService,
              private toastService: ToastService) {
  }

  configure() {
    this.oauthService.configure(authConfig)
    this.oauthService.tokenValidationHandler = new JwksValidationHandler()
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .catch(() => {
        this.toastService.sendError('Could not connect to auth-server')
        this.logout()
      })
  }

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
