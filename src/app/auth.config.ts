import { AuthConfig } from 'angular-oauth2-oidc';
import {environment} from "../environments/environment";

// INTROSPECTION
// with Keycloak 11.0.2
// siehe https://www.keycloak.org/docs/latest/securing_apps/index.html#endpoints-2

export const authConfig: AuthConfig = {
  issuer: `${environment.oauthUrl}/auth/realms/${environment.realmName}`,
  loginUrl: `${environment.oauthUrl}/auth/realms/${environment.realmName}/protocol/openid-connect/auth`,
  logoutUrl: `${environment.oauthUrl}/auth/realms/${environment.realmName}/protocol/openid-connect/logout`,
  tokenEndpoint: `${environment.oauthUrl}/auth/realms/${environment.realmName}/protocol/openid-connect/token`,
  sessionCheckIFrameUrl: `${environment.oauthUrl}/auth/realms/${environment.realmName}/protocol/openid-connect/login-status-iframe.html`,
  userinfoEndpoint: `${environment.oauthUrl}/auth/realms/${environment.realmName}/protocol/openid-connect/userinfo`,
  clientId: environment.realmName,
  redirectUri: window.location.origin + '/index.html',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'profile email',
  silentRefreshTimeout: 5000, // For faster testing
  timeoutFactor: 0.25, // For faster testing
  sessionChecksEnabled: true,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false,
  requireHttps: false
};
