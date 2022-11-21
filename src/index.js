import "./styles.css"; // keep this here!

// Let's write (or copy-paste 😏) our code below this line ↓

import {
  Engine,
  Scene,
  UniversalCamera,
  ArcRotateCamera,
  MeshBuilder,
  StandardMaterial,
  DirectionalLight,
  SceneLoader,
  Vector3,
  Color3
} from "@babylonjs/core";

// Get the canvas element and resize it to cover the full window
const canvas = document.getElementById("renderCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const engine = new Engine(canvas, true);
const scene = new Scene(engine);

// zde si zadej kameru
//const camera = new UniversalCamera("Camera", new Vector3(0, 0.8, -100), scene);
const camera = new ArcRotateCamera(
  "Camera",
  0.4,
  0,
  100,
  new Vector3(0, 0, 0),
  scene
);
//const camera = new UniversalCamera("Camera", 0, 0.8, 100, Vector3.Zero(), scene);
// Point the camera towards the scene origin
camera.setTarget(Vector3.Zero());

// And finally attach it to the canvas
camera.attachControl(canvas, true);

const light = new DirectionalLight(
  "DirectionalLight",
  new Vector3(1, 1, 1),
  scene
);
var skull;
SceneLoader.ImportMesh("", "public/", "skull.babylon", scene, function (
  newMeshes
) {
  // Set the target of the camera to the first imported mesh
  camera.target = newMeshes[0];
  skull = newMeshes[0];
  scene.registerBeforeRender(function () {
    skull.rotation.y += 0.4444;
  });
});
const tool = MeshBuilder.CreateCylinder(
  "tool1",
  { height: 50, diameter: 5 },
  scene
);
tool.position.z = 50;
tool.position.y = 50;
// Our beforeRender function
scene.registerBeforeRender(function () {
  tool.rotation.y += 0.011;
});

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});
