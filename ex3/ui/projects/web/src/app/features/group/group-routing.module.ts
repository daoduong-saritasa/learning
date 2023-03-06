import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { unauthorizedGuard } from '@saanbo/common/core/guards/unauthorized.guard';

import { GroupComponent } from './group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
    canActivate: [unauthorizedGuard],
    children: [
      {
        path: ':id',
        component: GroupDetailComponent,
        canActivate: [unauthorizedGuard],
      },
    ],
  },
];

/** Group routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
