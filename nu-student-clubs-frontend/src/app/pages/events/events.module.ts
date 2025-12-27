import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EventListComponent
  ]
})
export class EventsModule { }
