import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BoardMemberManagementComponent } from './board-member-management/board-member-management.component';
import { CommitteeManagementComponent } from './committee-management/committee-management.component';
import { ClubsManagementComponent } from './clubs-management/clubs-management.component';
import { EventsManagementComponent } from './events-management/events-management.component';
import { MediaManagementComponent } from './media-management/media-management.component';
import { ApplicationsReviewComponent } from './applications-review/applications-review.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  },
  {
    path: 'clubs',
    component: ClubsManagementComponent
  },
  {
    path: 'events',
    component: EventsManagementComponent
  },
  {
    path: 'media',
    component: MediaManagementComponent
  },
  {
    path: 'applications',
    component: ApplicationsReviewComponent
  },
  {
    path: 'board-members',
    component: BoardMemberManagementComponent
  },
  {
    path: 'committees',
    component: CommitteeManagementComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    AdminDashboardComponent,
    ClubsManagementComponent,
    EventsManagementComponent,
    MediaManagementComponent,
    ApplicationsReviewComponent,
    BoardMemberManagementComponent,
    CommitteeManagementComponent,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class AdminModule { }
