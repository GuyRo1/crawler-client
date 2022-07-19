import { formDataType } from "./FormData";



export interface ServerToClientEvents {
  url: (url: string[]) => void;
  ack: () => void;
  finished: ()=>void;
  }
  
 export interface ClientToServerEvents {
    hello: () => void;
    data:(data:formDataType)=>void;
  }
  
 export interface SocketData {
    url: string[];
  }