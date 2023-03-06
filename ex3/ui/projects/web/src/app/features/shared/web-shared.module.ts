import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonSharedModule } from '@saanbo/common/shared/common-shared.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CheckmarkComponent } from './icons/checkmark/checkmark.component';
import { ExitComponent } from './icons/exit/exit.component';

/** Module that contains entities shared between features/layouts. */
@NgModule({
  declarations: [NavbarComponent, CheckmarkComponent, ExitComponent],
  providers: [],
  imports: [CommonModule, CommonSharedModule],
  exports: [NavbarComponent, CheckmarkComponent, ExitComponent],
})
export class WebSharedModule {}
