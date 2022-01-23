import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MetricGraphComponent} from './components/telemetry/metric-graph/metric-graph.component';
import {LogListComponent} from './components/telemetry/log-list/log-list.component';
import {LogListEntryComponent} from './components/telemetry/log-list-entry/log-list-entry.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";
import {GraphDashboardComponent} from './components/telemetry/graph-dashboard/graph-dashboard.component';
import {GraphDialogComponent} from './components/telemetry/graph-dialog/graph-dialog.component';
import {ModalComponent} from './components/modal/modal.component';
import {FilterComponent} from './components/filter/filter.component';
import {DetectorsComponent} from './components/detectors/detectors.component';
import {TimespanPipe} from './pipes/timespan.pipe';
import {DetectorDialogComponent} from './components/detector-dialog/detector-dialog.component';
import {ErrorsComponent} from './components/errors/errors.component';
import {ToastComponent} from './components/toast/toast.component';
import {ClientsComponent} from './components/clients/clients.component';
import {ReplacementPipe} from './pipes/replacement.pipe';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {OAuthModule} from "angular-oauth2-oidc";
import {LoaderComponent} from './components/loader/loader.component';
import {LoaderService} from "./services/loader.service";
import {LoaderInterceptor} from "./interceptors/loader.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MetricGraphComponent,
    LogListComponent,
    LogListEntryComponent,
    GraphDashboardComponent,
    GraphDialogComponent,
    ModalComponent,
    FilterComponent,
    DetectorsComponent,
    TimespanPipe,
    DetectorDialogComponent,
    ErrorsComponent,
    ToastComponent,
    ClientsComponent,
    ReplacementPipe,
    DashboardComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    OAuthModule.forRoot()
  ],
  providers: [
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
