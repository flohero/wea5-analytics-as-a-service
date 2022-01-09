import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RelationshipGraphComponent} from "./components/telemetry/graphs/relationship-graph/relationship-graph.component";
import {MetricGraphComponent} from "./components/telemetry/graphs/metric-graph/metric-graph.component";
import {LogListComponent} from "./components/telemetry/log-list/log-list.component";

const routes: Routes = [
  {
    path: "graph",
    component: RelationshipGraphComponent
  },
  {
    path: "charts",
    component: MetricGraphComponent
  },
  {
    path: "logs",
    component: LogListComponent
  },
  {
    path: 'relations',
    component: RelationshipGraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
