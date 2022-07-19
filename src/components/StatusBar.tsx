
import { useMemo } from 'react';
import { constants } from './../styles';

type Props = { urls: string[], dupes: number, connected: boolean }

const StatusBar = ({ urls, dupes, connected }: Props) => {


    const displayDupes = useMemo(() =>
        dupes !== 0 ? `Duplicate links: ${dupes}` : ``
        , [dupes])

    const displayConnectionState = useMemo(() => ({
        text: connected ? `Connected` : `Disconnected`,
        iconStyle: {
            height: 20,
            width: 20,
            borderRadius: 50,
            backgroundColor: connected ? `green` : `red`
        }
    }), [connected])


    return (
        <div className="status-bar-container">
            <div >  {`Number of links ${urls.length}`}   </div>
            <div>{displayDupes}</div>
            <div className="connected">
                <div style={displayConnectionState.iconStyle}></div>
                <div>{displayConnectionState.text}</div>
            </div>
        </div>



    )
}

export default StatusBar

