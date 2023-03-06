import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Exit component. */
@Component(
  {
    selector: 'exit',
    templateUrl: './exit.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
  },
)

export class ExitComponent {}
