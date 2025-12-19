import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubListComponent } from './club-list/club-list';
import { ClubDetailsComponent } from './club-details/club-details';
import { MyMembershipsComponent } from './my-memberships/my-memberships';

const routes: Routes = [
  {
    path: '',
    component: ClubListComponent
  },
  {
    path: 'my-memberships',
    component: MyMembershipsComponent
  },
  {
    path: ':id',
    component: ClubDetailsComponent
  }
];

@NgModule({
  imports: [
    ClubListComponent,
    ClubDetailsComponent,
    MyMembershipsComponent,
    RouterModule.forChild(routes)
  ]
})
export class ClubsModule { }
