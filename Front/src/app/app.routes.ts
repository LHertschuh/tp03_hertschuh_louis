import { Routes } from '@angular/router';
import { PollutionListComponent } from './components/pollution-list/pollution-list';
import { PollutionDetailComponent } from './components/pollution-detail/pollution-detail';
import { PollutionFormComponent } from './components/pollution-form/pollution-form';

export const routes: Routes = [
  { path: '', redirectTo: '/pollutions', pathMatch: 'full' },
  { path: 'pollutions', component: PollutionListComponent },
  { path: 'pollutions/new', component: PollutionFormComponent },
  { path: 'pollutions/:id', component: PollutionDetailComponent },
  { path: 'pollutions/:id/edit', component: PollutionFormComponent }
];