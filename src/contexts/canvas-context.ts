import {createContext} from 'react';

interface ICanvasContext {
  canvasState: {
    zoom: number;
    rotation: number;
  },
  canvasDispatch: (action: any) => void;
}

export const CanvasContext = createContext<any>({});