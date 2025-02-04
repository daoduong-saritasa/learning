import { ChangeDetectionStrategy, Component, ElementRef, inject, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainScene } from '@babylonjs-boilerplate/immersive';

/** App component. */
@Component({
  selector: 'babylonjs-boilerplate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {

  private readonly ngZone = inject(NgZone);

  protected numberOfSpheres = 10;

  protected numberOfCubes = 10;

  /** Canvas reference. */
  @ViewChild('canvas')
  protected canvasRef?: ElementRef<HTMLCanvasElement>;

  private scene: MainScene | null = null;

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.scene?.erase();
  }

  /** On start click. */
  protected onStart() {
    if (this.canvasRef != null) {
      this.scene = new MainScene(this.canvasRef.nativeElement, this.numberOfSpheres, this.numberOfCubes);
    }
  }
}
