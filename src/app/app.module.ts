import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MetricGraphComponent} from './components/telemetry/metric-graph/metric-graph.component';
import {LogListComponent} from './components/telemetry/log-list/log-list.component';
import {LogListEntryComponent} from './components/telemetry/log-list-entry/log-list-entry.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";
import { GraphDashboardComponent } from './components/telemetry/graph-dashboard/graph-dashboard.component';
import { GraphDialogComponent } from './components/telemetry/graph-dialog/graph-dialog.component';
import { ModalComponent } from './components/modal/modal.component';
import { FilterComponent } from './components/filter/filter.component';
import { DetectorsComponent } from './components/detectors/detectors.component';
import { TimespanPipe } from './pipes/timespan.pipe';
import { DetectorDialogComponent } from './components/detector-dialog/detector-dialog.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { ToastComponent } from './components/toast/toast.component';

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
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NgChartsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
