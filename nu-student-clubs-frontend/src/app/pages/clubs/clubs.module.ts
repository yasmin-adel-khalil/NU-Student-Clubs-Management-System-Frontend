import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clubs',
  template: '<h1>Clubs</h1>',
  standalone: true
})
export class ClubsComponent { }

const routes: Routes = [
  {
    path: '',
    component: ClubsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClubsModule { }
