import React, { createContext, FC, ReactNode } from "react"
import { formDataType } from "../models/FormData";
import useSocketIo from './../hooks/useSocketIo';

type ContextValue = {
    urls: string[],
    connect: (data: formDataType) => void
    restart: (data: formDataType) => void
    status: string
}

export const socketIoContext = createContext<ContextValue>({
    urls: [],
    connect: (data: formDataType) => { },
    restart: (data: formDataType) => { },
    status: ''
})

type props = {
    children: ReactNode
}


const SocketIoContextProvider: FC<props> = ({ children }) => {

    const { status, urls, connect, restart } = useSocketIo()

    return (
        <socketIoContext.Provider value={{ status, urls, connect, restart }}>
            {children}
        </socketIoContext.Provider>
    )

}

export default SocketIoContextProvider