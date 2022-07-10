import { useCallback, useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from './../models/socketIoTypes';



const useSocketIo = () => {
    const [socket, setSocket] = useState<null | Socket<ServerToClientEvents, ClientToServerEvents>>(null);
    const [urls, setUrls] = useState<string[]>([])
    const [status, setStatus] = useState<string>('pending')
    const updateUrls: ((url: string) => void)
        = useCallback((url: string) => {
            setUrls((prevData: string[]) => {
                const newUrls = [...prevData, url];
                return newUrls;
            });
        }, [])

    useEffect(
        () => {
            let newSocket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null
            if (status === 'started') {
                newSocket = io(`http://${window.location.hostname}:3001`);
                setSocket(newSocket);
            }

            return (() => {
                if (newSocket)
                    newSocket.close()
            });
        }, [status]);

    useEffect(() => {
        if (socket)
            socket.on('url', updateUrls);
    }, [socket, updateUrls])


    return urls

}

export default useSocketIo