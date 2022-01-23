import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogListComponent} from "./components/telemetry/log-list/log-list.component";
import {GraphDashboardComponent} from "./components/telemetry/graph-dashboard/graph-dashboard.component";
import {DetectorsComponent} from "./components/detectors/detectors.component";
import {ClientsComponent} from "./components/clients/clients.component";

const routes: Routes = [
  {
    path: "graphs",
    component: GraphDashboardComponent
  },
  {
    path: "logs",
    component: LogListComponent
  },
  {
    path: "detectors",
    component: DetectorsComponent
  },
  {
    path: "clients",
    component: ClientsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
