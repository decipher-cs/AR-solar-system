## AR Solar System

The planets in our solar system are unbelievably far away from each other. Get a sense of the scale by using augmented reality to project the planets and their orbits right in front of you.

> **Experimental** : This app is based on webXR which is an experimental technology. 
> Check the Browser compatibility table on mdn carefully before using this in production. 
> It is advised to run this app on Chrome for Android, on a mid to high-end smartphone.

### Credits

Thanks to [solar system scope](https://www.solarsystemscope.com/textures/) for providing planet textures. This saved me hours of work that I would have had to spend in blender creating my own GTLF and 3D models. Instead I created the mesh imperatively in code and just applied the texture on the fly.

### Usage

There are two modes.

- AR mode :
This mode requires you use a chrome based browser on android with your phone's camera. The planets and their orbits will be projects in the live feed of the camera. Unfortunetly, this technology uses webXR which is still in its early phase. This tech is quite experimental and therefore doesn't have a good support across devices.

- Browser mode :
In case your device does not support webXR the app can also render the scene in your browser. This won't be as pretty but it's better then nothing.

### Compatibility

The [webXR API is experimental technology.](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
You can check if your device is compatible [here.](https://immersive-web.github.io/webxr-samples/)
In unsupported devices meta's `IWER` is used for [emulation](https://pmndrs.github.io/xr/docs/getting-started/development-setup#2.-emulator:-iwer/devui)

### Development setup

Install `node_modules` with `pnpm i` and run the dev server with `pnpm dev`.
A secure context (https) is required for XR to work properly which is taken care by using the package `@vitejs/plugin-basic-ssl`.
Build with `pnpm build`

### Purpose

Hackathon: [Stellar gateway quest](https://devpost.com/software/solar-system-ar)

### Tech

React, Typescript, Tailwind, Vite, XR, React Three Fiber, Three.js, Drei

https://pmndrs.github.io/xr/

### ToDo:

- [x] Add gtlf for celestial bodies
- [x] Add credits/addribution for 3D models
- [ ] Add a table for inaccuracies
- [ ] Remove magic numbers from component - `Planet` and `Orbit` for y-axis
- [x] on AR exit change experience mode to `null`
- [ ] Add a warning for device support and performence issues on low-end devices
