import { useCallback, useEffect, useState, useRef } from "react";
import io, { Socket } from 'socket.io-client';
import { formDataType } from "../models/FormData";
import { ClientToServerEvents, ServerToClientEvents } from './../models/socketIoTypes';



const useSocketIo = () => {
    const urlsSet = useRef<Set<string>>(new Set<string>())
    const [socket, setSocket] = useState<null | Socket<ServerToClientEvents, ClientToServerEvents>>(null);
    const [connected, setConnected] = useState<boolean>(false)
    const [urls, setUrls] = useState<string[]>([])
    const [status, setStatus] = useState<string>('pending')
    const [data, setData] = useState<formDataType | null>(null)
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
        if (socket) {
            socket.on('url', (url: string) => {
                console.log(url);
                if (!urlsSet.current.has(url)) {
                    urlsSet.current.add(url)
                    updateUrls(url)
                }


            });
            socket.on('ack', () => {
                console.log('connection established');
                setConnected(true)
            })
        }

    }, [socket])

    useEffect(() => {
        if (socket && connected && data) {
            socket.emit('data', data)
        }
    }, [socket, connected, data])

    const connect = useCallback((data: formDataType) => {
        setData(data)
        setStatus('started')
    }, [])

    return { urls, connect }

}

export default useSocketIo