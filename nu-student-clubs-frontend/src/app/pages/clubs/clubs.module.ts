import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { ClubDetailsComponent } from './club-details.component';
import { ClubListComponent } from './club-list.component';

@Component({
  selector: 'app-clubs',
  template: '<h1>Clubs</h1>',
  standalone: true
})
export class ClubsComponent { }

const routes: Routes = [
  {
    path: '',
    component: ClubListComponent
  },
  {
    path: ':id',
    component: ClubDetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ClubDetailsComponent,
    ClubListComponent
  ]
})
export class ClubsModule { }
