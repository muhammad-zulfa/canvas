import { CanvasContext } from "../contexts/canvas-context";
import { useReducer } from "react";

const defaultState = {
  zoom: 100,
  rotation: 0
}

export const CanvasProviders: React.FC<{}> = ({ children }) => {

  const [canvasState, canvasDispatch] = useReducer(
    (state : any, action: any) => {
      switch (action.type) {
        case "zoomIn":
          const zoom = Math.min(state.zoom + 10, 100);
          return { ...state, zoom };
        case "zoomOut":
          const zoomOut = Math.max(state.zoom - 10, 0);
          return { ...state, zoom: zoomOut };
        case "rotateClockwise":
          const rotation = Math.min(state.rotation + 90, 90);
          return { ...state, rotation };
        case "rotateCounterClockwise":
          const rotationVal = Math.max(state.rotation - 90, -90);
          return { ...state, rotation: rotationVal };
        default:
          throw new Error();
      }
    }, 
    defaultState);

  return (
    <CanvasContext.Provider value={{canvasState, canvasDispatch}}>
      {children}
    </CanvasContext.Provider>
  );
};