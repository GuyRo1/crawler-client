


export interface ServerToClientEvents {
    url: (url:string) => void;
  }
  
 export interface ClientToServerEvents {
    hello: () => void;
  }
  
 export interface SocketData {
    url: string;
  }