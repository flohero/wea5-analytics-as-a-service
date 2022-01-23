import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogListComponent} from './components/telemetry/log-list/log-list.component';
import {GraphDashboardComponent} from './components/telemetry/graph-dashboard/graph-dashboard.component';
import {DetectorsComponent} from './components/detectors/detectors.component';
import {ClientsComponent} from './components/clients/clients.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'index.html',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'silent-refresh.html',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'graphs',
    component: GraphDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logs',
    component: LogListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detectors',
    component: DetectorsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
