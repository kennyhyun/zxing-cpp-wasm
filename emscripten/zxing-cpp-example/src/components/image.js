import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

export const QrImage = ({
  url = "",
  title = "",
  width = 240,
  setCanvas = () => {},
  result = { code: "", error: 0 }
}) => {
  const canvasRef = React.useRef(null);
  const drawCanvas = e => {
    const { current: canvas } = canvasRef;
    const image = e.target;
    const { width, height } = image;
    Object.assign(canvas, { width, height });
    setCanvas(canvas);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
  };
  const textStyle = {
    overflowWrap: "anywhere"
  };
  const codeStyle = {
    ...textStyle,
    color: "green",
    textShadow: "1px 1px 2px black, 0 0 0.2em white"
  };
  const errorStyle = {
    ...textStyle,
    color: "red",
    textShadow: "1px 1px 2px black, 0 0 0.2em white"
  };
  return (
    <>
      <canvas style={{ display: "none" }} ref={canvasRef}></canvas>
      <img onLoad={drawCanvas} src={url} alt={title} loading="lazy" />
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 10, bottom: 0 }}>
        <Typography sx={codeStyle}>{result.code}</Typography>
        <Typography sx={errorStyle}>{result.error || ""}</Typography>
      </Box>
    </>
  );
};
