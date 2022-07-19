import { useCallback, useEffect, useState, useRef } from "react";
import io, { Socket } from 'socket.io-client';
import { formDataType } from "../models/FormData";
import { ClientToServerEvents, ServerToClientEvents } from './../models/socketIoTypes';

const valid = (url: string): boolean => url[0] === 'h'



const useSocketIo = () => {
    const dupesRef = useRef(0)
    const urlsSet = useRef<Set<string>>(new Set<string>())
    const [dupes, setDupes] = useState(0);
    const [socket, setSocket] = useState<null | Socket<ServerToClientEvents, ClientToServerEvents>>(null);
    const [connected, setConnected] = useState(false)
    const [urls, setUrls] = useState<string[]>([])
    const [status, setStatus] = useState('pending')
    const [data, setData] = useState<formDataType | null>(null)
    const updateUrls: ((urls: string[]) => void)
        = useCallback((urls: string[]) => {
            const newUrls: string[] = []
            urls.forEach((url: string) => {
                if (!valid(url) || urlsSet.current.has(url)) {
                    dupesRef.current = dupesRef.current + 1
                    return
                }

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
            socket.on('finished', () => {
                setDupes(dupesRef.current)
                socket.close()
                setConnected(false)
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
            dupesRef.current = 0;
            setDupes(0)
            setUrls([]);
            setData(data)
            socket?.close()
            setConnected(false)
            const newSocket = io(`http://${window.location.hostname}:3001`);
            setSocket(newSocket)
            urlsSet.current = new Set<string>()
        }, [socket])

    return { dupes, connected, status, urls, connect, restart }

}

export default useSocketIo