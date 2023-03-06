import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonSharedModule } from '@saanbo/common/shared/common-shared.module';

import { WebSharedModule } from '../shared/web-shared.module';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupListComponent } from './group-list/group-list.component';

/** Group module. */
@NgModule({
  declarations: [GroupComponent, GroupDetailComponent, GroupListComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    CommonSharedModule,
    WebSharedModule,
  ],
})
export class GroupModule {}
