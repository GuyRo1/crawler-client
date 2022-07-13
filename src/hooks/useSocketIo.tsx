import { useCallback, useEffect, useState, useRef } from "react";
import io, { Socket } from 'socket.io-client';
import { formDataType } from "../models/FormData";
import { ClientToServerEvents, ServerToClientEvents } from './../models/socketIoTypes';

const valid = (url: string): boolean => url[0] === 'h'



const useSocketIo = () => {
    const urlsSet = useRef<Set<string>>(new Set<string>())
    const [socket, setSocket] = useState<null | Socket<ServerToClientEvents, ClientToServerEvents>>(null);
    const [connected, setConnected] = useState<boolean>(false)
    const [urls, setUrls] = useState<string[]>([])
    const [status, setStatus] = useState<string>('pending')
    const [data, setData] = useState<formDataType | null>(null)
    const updateUrls: ((urls: string[]) => void)
        = useCallback((urls: string[]) => {
            const newUrls: string[] = []
            urls.forEach((url: string) => {
                if (!valid(url) || urlsSet.current.has(url)) return
                urlsSet.current.add(url)
                newUrls.push(url)
            })
            setUrls((prevData: string[]) =>
                [...prevData, ...newUrls]);
        }, [])

    useEffect(
        () => {
            let newSocket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null
            if (status === 'connected') {
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
            socket.on('url', (urls: string[]) => {
                updateUrls(urls)
            });
            socket.on('ack', () => {
                console.log('connection established');
                setConnected(true)
            })
        }

    }, [socket, updateUrls])

    useEffect(() => {
        if (socket && connected && data) {
            socket.emit('data', data)
        }
    }, [socket, connected, data])

    const connect = useCallback((data: formDataType) => {
        setData(data)
        setStatus('connected')
    }, [])

    const restart = useCallback(
        (data: formDataType) => {
            setUrls([]);
            setData(data)
        }, [])

    return { status, urls, connect, restart }

}

export default useSocketIo