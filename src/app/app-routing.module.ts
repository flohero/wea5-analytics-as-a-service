import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogListComponent} from "./components/telemetry/log-list/log-list.component";
import {GraphDashboardComponent} from "./components/telemetry/graph-dashboard/graph-dashboard.component";

const routes: Routes = [
  {
    path: "graphs",
    component: GraphDashboardComponent
  },
  {
    path: "logs",
    component: LogListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
