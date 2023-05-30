import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HouseComponent } from './components/house/house.component';

const routes: Routes = [
  { path: '', redirectTo: '/house', pathMatch: 'full' },
  { path: 'house', component: HouseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
