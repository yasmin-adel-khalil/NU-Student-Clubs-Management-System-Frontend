import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BoardMemberManagementComponent } from './board-member-management/board-member-management.component';
import { CommitteeManagementComponent } from './committee-management/committee-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
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
    BoardMemberManagementComponent,
    CommitteeManagementComponent,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class AdminModule { }
