import debounce from "lodash.debounce";
import React from "react";
import { MasonryImageList } from "./list";
import { ZXing } from "./zxing";
import { scanCanvas } from "../controller/scan";

const { PUBLIC_URL } = process.env;
const items = Array(17)
  .fill()
  .map((_, i) => ({ url: `${PUBLIC_URL}/img_${i}.jfif` }));
const canvasMap = new Map();
const result = new Map();

let scanned = false;
const tryScan = debounce(async cbExecuted => {
  if (scanned) {
    return;
  }
  cbExecuted(1);
  scanned = true;
  const message = `Scanned ${canvasMap.size} canvases`;
  console.time(message);
  await [...canvasMap.keys()].reduce(async (p, canvas) => {
    await p;
    const { code, error } = await scanCanvas(canvas).catch(e =>
      e?.message ? { error: e.message } : e
    );
    const url = canvasMap.get(canvas);
    result.set(url, { code, error });
  }, Promise.resolve());
  console.timeEnd(message);
  cbExecuted(2);
}, 1000);

export const ImageScanner = () => {
  const [step, setStep] = React.useState(0);
  return (
    <>
      <ZXing />
      {(() => {
        switch (step) {
          case 0:
            return `Waiting for ${items.length} images loaded...`;
          case 1:
            return "Scannng...";
          default:
            return `Scanned ${items.length} images`;
        }
      })()}
      <MasonryImageList
        items={items}
        onRendered={() => tryScan(s => setStep(s))}
        canvasMap={canvasMap}
        resultMap={result}
      />
    </>
  );
};

export default ImageScanner;
