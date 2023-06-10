import React, { useEffect, useRef, useState } from "react";
import { CanvasContext } from "../contexts/canvas-context";
import styles from "@styles/modules/canvas-layout.module.scss";
import styled from "styled-components";
import { useWindowSize } from "src/hooks/use-window-size";

const Tar = styled.div<{zoom: number, rotate: number}>`
  position: relative;
  cursor: crosshair;
  -moz-transform: ${(props: any) => `scale(${props.zoom / 100}) rotate(${props.rotate}deg)` };
  transform: ${(props: any) => `scale(${props.zoom / 100}) rotate(${props.rotate}deg)` };
  -webkit-transform: ${(props: any) => `scale(${props.zoom / 100}) rotate(${props.rotate}deg)` };
`

export const CanvasLayout: React.FC<{}> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const {width, height} = useWindowSize()
  const { canvasState, canvasDispatch } = React.useContext(CanvasContext);
  const [shape, setShape] = useState('line')
  
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    ctx!.fillStyle = "white";
    let prevX = 0,
        currX = 0,
        prevY = 0,
        beginX = 0,
        beginY = 0,
        currY = 0,
        dot_flag = false, flag = false;
        function draw() {
          ctx?.beginPath();
          ctx?.moveTo(prevX, prevY);
          ctx?.lineTo(currX, currY);
          ctx!.strokeStyle = "#000";
          ctx!.lineWidth = 2;
          ctx!.stroke();
          ctx!.closePath();
      }
    function findxy(res: string, e: MouseEvent) {
      console.log(shape)
      if (res == 'down') {
          prevX = currX;
          prevY = currY;
          currX = e.offsetX - canvas.offsetLeft;
          currY = e.offsetY - canvas.offsetTop;
          beginX = currX
          beginY = currY

          flag = true;
          dot_flag = true;
          highlightRef.current!.style.top = (beginY) + 'px'
          highlightRef.current!.style.left = (beginX) + 'px'
          if (dot_flag) {
              ctx?.beginPath();
              ctx!.fillStyle = 'black';
              shape === 'line' && ctx?.fillRect(currX, currY, 2, 2);
              ctx?.closePath();
              dot_flag = false;
          }
          
      }
      if (res == 'up' || res == "out") {
          flag = false;
          shape === 'rect' && ctx?.fillRect(beginX, beginY, currX - beginX - 5, currY - beginY - 5);
          highlightRef.current!.style.width = '0px';
          highlightRef.current!.style.height = '0px';
      }
      if (res == 'move') {
          if (flag) {
              prevX = currX;
              prevY = currY;
              currX = e.offsetX - canvas.offsetLeft;
              currY = e.offsetY - canvas.offsetTop;
              shape === 'line' && draw();
              if(currY < beginY){
                highlightRef.current!.style.top = currY + 'px'
                highlightRef.current!.style.height = (beginY - currY + 5) + 'px'
              }else{
                highlightRef.current!.style.top = beginY + 'px'
                highlightRef.current!.style.height = (currY - beginY - 5) + 'px'
              }
              
              if(currX < beginX){
                highlightRef.current!.style.left = currX + "px"
                highlightRef.current!.style.width = (beginX - currX + 5) + 'px'
              }else{
                highlightRef.current!.style.left = beginX + "px"
                highlightRef.current!.style.width = (currX - beginX - 5) + 'px'
              }
          }
      }
  }
    canvas.addEventListener("mousemove", function (e) {
      findxy('move', e)
    });
    canvas.addEventListener("mousedown", function (e) {
      findxy('down', e)
    });
    canvas.addEventListener("mouseup", function (e) {
      findxy('up', e)
      });
    canvas.addEventListener("mouseout", function (e) {
      console.log("mouseout")
    });
    
    return () => {
      canvas.removeEventListener("mouseout", () => {});
      canvas.removeEventListener("mouseup", () => {});
      canvas.removeEventListener("mousedown", () => {});
      canvas.removeEventListener("mousemove", () => {});
    }
  },[shape])

  return (
    <Tar
      className={styles.test}
      zoom={canvasState.zoom}
      rotate={canvasState.rotation}
    >
      <canvas width={width} height={height} ref={canvasRef}>
        {" "}
      </canvas>
      <div
        ref={highlightRef}
        style={{
          position: "absolute",
          background: "rgba(59, 147, 199, 0.4)",
          border: "1px solid rgba(59, 147, 199, 0.8)",
        }}
      ></div>

      <button
        style={{ position: "absolute", top: 0 }}
        onClick={() => setShape("rect")}
      >
        Rect
      </button>
      {children}
    </Tar>
  );
}