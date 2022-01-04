import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarItemComponent } from './components/navbar-item/navbar-item.component';
import { RelationshipGraphComponent } from './components/telemetry/graphs/relationship-graph/relationship-graph.component';
import { MetricGraphComponent } from './components/telemetry/graphs/metric-graph/metric-graph.component';
import { LogListComponent } from './components/telemetry/log-list/log-list.component';
import { LogListEntryComponent } from './components/telemetry/log-list-entry/log-list-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarItemComponent,
    RelationshipGraphComponent,
    MetricGraphComponent,
    LogListComponent,
    LogListEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
