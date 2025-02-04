import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainScene } from '@babylonjs-boilerplate/immersive';

/** App component. */
@Component({
  selector: 'babylonjs-boilerplate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnDestroy {

  private readonly ngZone = inject(NgZone);

  private readonly numberOfSpheres = 10;

  private readonly numberOfCubes = 10;

  /** Canvas reference. */
  @ViewChild('canvas')
  protected canvasRef?: ElementRef<HTMLCanvasElement>;

  private scene: MainScene | null = null;

  /** @inheritdoc */
  public ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.canvasRef != null) {
        this.scene = new MainScene(this.canvasRef.nativeElement, this.numberOfSpheres, this.numberOfCubes);
      }
    })
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.scene?.erase();
  }
}
