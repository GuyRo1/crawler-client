import React, { createContext, FC, ReactNode } from "react"
import { formDataType } from "../models/FormData";
import useSocketIo from './../hooks/useSocketIo';

type ContextValue = {
    urls: string[],
    connect: (data: formDataType) => void
}

export const socketIoContext = createContext<ContextValue>({
    urls: [],
    connect: (data: formDataType) => { }
})

type props = {
    children: ReactNode
}


const SocketIoContextProvider: FC<props> = ({ children }) => {

    const { urls, connect } = useSocketIo()

    return (
        <socketIoContext.Provider value={{ urls, connect }}>
            {children}
        </socketIoContext.Provider>
    )

}

export default SocketIoContextProvider