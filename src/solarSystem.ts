import mercuryTexture from "./assets/8k_mercury.jpg";
import venusTexture from "./assets/8k_venus_surface.jpg";
import earthTexture from "./assets/8k_earth_daymap.jpg";
import marsTexture from "./assets/8k_mars.jpg";
import jupiterTexture from "./assets/8k_jupiter.jpg";
import saturnTexture from "./assets/8k_saturn.jpg";
import uranusTexture from "./assets/2k_uranus.jpg";
import neptuneTexture from "./assets/2k_neptune.jpg";

export const solarSystemData = [
  {
    planet: "Mercury",
    orbitRadius: 0.39,
    planetRadius: 0.383,
    orbitSpeed: 1.607,
    texture: mercuryTexture,
  },
  {
    planet: "Venus",
    orbitRadius: 0.72,
    planetRadius: 0.95,
    orbitSpeed: 1.176,
    texture: venusTexture,
  },
  {
    planet: "Earth",
    orbitRadius: 1.0,
    planetRadius: 1.0,
    orbitSpeed: 1.0,
    texture: earthTexture,
  },
  {
    planet: "Mars",
    orbitRadius: 1.52,
    planetRadius: 0.532,
    orbitSpeed: 0.809,
    texture: marsTexture,
  },
  {
    planet: "Jupiter",
    orbitRadius: 5.2,
    planetRadius: 10.974,
    orbitSpeed: 0.439,
    texture: jupiterTexture,
  },
  {
    planet: "Saturn",
    orbitRadius: 9.58,
    planetRadius: 9.14,
    orbitSpeed: 0.325,
    texture: saturnTexture,
  },
  {
    planet: "Uranus",
    orbitRadius: 19.22,
    planetRadius: 3.978,
    orbitSpeed: 0.229,
    texture: uranusTexture,
  },
  {
    planet: "Neptune",
    orbitRadius: 30.05,
    planetRadius: 3.867,
    orbitSpeed: 0.182,
    texture: neptuneTexture,
  },
];
