import React, { createContext, FC, ReactNode } from "react"
import useSocketIo from './../hooks/useSocketIo';


export const socketIoContext = createContext<string[]>([])

type props = {
    children: ReactNode
}


const SocketIoContextProvider: FC<props> = ({ children }) => {

    const urls = useSocketIo()

    return (
        <socketIoContext.Provider value={urls}>
            {children}
        </socketIoContext.Provider>
    )

}

export default SocketIoContextProvider