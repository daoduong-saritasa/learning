import {
  AbstractMesh,
  Animation,
  Axis,
  CannonJSPlugin,
  Color3,
  Engine,
  Mesh,
  MeshBuilder,
  PhysicsImpostor,
  Plane,
  Quaternion,
  Scalar,
  Scene,
  SceneLoader,
  Space,
  StandardMaterial,
  Tools,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import * as CANNON from 'cannon';

import { MainLight } from './main-light';
import { MainCamera } from './main-camera';

import { assertNonNullWithReturn } from '../../../utils/assert-non-null';

const NUMBER_OF_SPHERES = 10;

/** Main scene of the app. */
export class MainScene {
  private readonly engine = new Engine(this.canvas);
  private readonly scene = new Scene(this.engine);
  private destination: Vector3 | null = Vector3.Zero();
  private carSpeed = 0;
  private carAcceleration = 0;
  private spheres: Mesh[] = [];
  private car: Promise<AbstractMesh>;
  public constructor(private readonly canvas: HTMLCanvasElement) {
    MainCamera.create(this.scene);
    MainLight.create(this.scene);

    // enable physics
    const physicsPlugin = new CannonJSPlugin(true, 100, CANNON);
    this.scene.enablePhysics(new Vector3(0, -9.81, 0), physicsPlugin);
    this.createGround();
    this.car = this.createCar();
    this.spheres = this.createSpheres();
    this.handleCollision(this.car, this.spheres);
    this.initCarPhysics(canvas);

    this.engine.runRenderLoop(async () => {
      if (this.destination) {
        const carBody = await this.car;
        const direction = this.destination.subtract(carBody.position);
        direction.y = 0;
        const distance = Vector3.Distance(this.destination, carBody.position);
        const maxSpeed = 10;
        this.carAcceleration = Math.min(
          this.carAcceleration,
          maxSpeed / distance
        );
        this.carSpeed += this.carAcceleration;
        this.carSpeed = Math.min(this.carSpeed, maxSpeed);
        if (distance <= this.carSpeed) {
          this.destination = null;
          this.carSpeed = 0;
          this.carAcceleration = 0;
        } else {
          carBody.moveWithCollisions(
            direction.normalize().scale(this.carSpeed)
          );
        }
      }
      this.scene.render();
    });
  }

  /** Erase 3D related resources. */
  public erase(): void {
    this.scene.dispose();
    this.engine.dispose();
  }

  private async initCarPhysics(canvas: HTMLCanvasElement): Promise<void> {
    const car = await this.car;
    car.rotate(Axis.Y, Math.PI / 2, Space.WORLD);
    canvas.addEventListener('click', (event) => {
      const pickResult = this.scene.pick(event.offsetX, event.offsetY);
      this.destination = assertNonNullWithReturn(pickResult.pickedPoint);

      const angle = Math.atan2(
        this.destination.x - car.position.x,
        this.destination.z - car.position.z
      );
      const rotation =
        angle - (car.rotationQuaternion?.toEulerAngles().y ?? 0) + Math.PI;
      car.rotate(Axis.Y, rotation, Space.WORLD);
      const distance = Vector3.Distance(this.destination, car.position);
      this.carAcceleration = distance / 100;
    });
  }

  private async handleCollision(
    car: Promise<AbstractMesh>,
    spheres: Mesh[]
  ): Promise<void> {
    const carBody = await car;
    spheres.forEach((sphere) => {
      sphere.physicsImpostor?.registerOnPhysicsCollide(
        carBody.physicsImpostor!,
        (main) => {
          if (main.object === sphere) {
            this.carSpeed = 0;
            this.carAcceleration = 0;
            this.destination = null;
          }
        }
      );
    });
  }

  private createGround(): void {
    const ground = MeshBuilder.CreateBox(
      'ground',
      {
        width: 500,
        height: 1,
        depth: 500,
      },
      this.scene
    );
    ground.position.y = -5.0;
    const material = new StandardMaterial('groundMaterial');
    material.diffuseColor = Color3.Teal();
    ground.material = material;
    // enable physics for ground
    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, friction: 0.1, restitution: 0.7 },
      this.scene
    );
  }

  private async createCar(): Promise<AbstractMesh> {
    const { meshes } = await SceneLoader.ImportMeshAsync(
      '',
      '/assets/',
      'car1.glb',
      this.scene
    );
    const carBody = meshes[0];
    carBody.position = new Vector3(0, 0, 0);
    carBody.physicsImpostor = new PhysicsImpostor(
      carBody,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, friction: 0, restitution: 0.3 },
      this.scene
    );
    return carBody;
  }

  private createSphere(position: Vector3): Mesh {
    const sphere = MeshBuilder.CreateSphere(
      'sphere',
      { diameter: 10 },
      this.scene
    );
    sphere.position = position;
    const material = new StandardMaterial('sphereMaterial');
    material.diffuseColor = Color3.Random();
    sphere.material = material;
    sphere.physicsImpostor = new PhysicsImpostor(
      sphere,
      PhysicsImpostor.SphereImpostor,
      { mass: 1 },
      this.scene
    );
    return sphere;
  }

  private createSpheres(): Mesh[] {
    const result = [];
    for (let i = 0; i < NUMBER_OF_SPHERES; i++) {
      const randomPosition = new Vector3(
        -250 + Math.random() * 500,
        5,
        -250 + Math.random() * 500
      );
      const sphere = this.createSphere(randomPosition);
      result.push(sphere);
    }
    return result;
  }
}
