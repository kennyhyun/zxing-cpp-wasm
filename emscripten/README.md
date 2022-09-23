# emscripten extension

## how to build

1. install the emscripten
1. `cd ./build` (<project root>/emscripten/build)
1. `emcmake cmake ../..`
1. `emmake make -j4` (for 4 cores)

## how to run the example

1. copy `zxing.js` and `zxing.wasm` from build directory to `zxing-cpp-example/public` directory
1. `cd zxing-cpp-example`
1. `npm install`
1. `npm start`
1. open http://127.0.0.1:3000 in your brower

![image](https://user-images.githubusercontent.com/5399854/191961186-87a97177-4ff2-4fa8-959f-d48db234db67.png)

## Thanks to

- https://github.com/glassechidna/zxing-cpp
- https://github.com/yushulx/zxing-cpp-emscripten
