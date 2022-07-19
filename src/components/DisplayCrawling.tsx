import { useContext } from "react"
import { socketIoContext } from './../context/socketIoContext';
import DisplayUrl from './DisplayUrl';
import StatusBar from "./StatusBar";



const DisplayCrawling = () => {

    const { dupes, connected, urls } = useContext(socketIoContext)

    return <div className="display-container">
        <div className="display">
        {
            urls.length === 0 ?
                <>
                    <p>Fill the form and press submit!</p>
                    <p>Happy Crawling</p>
                </> :
                <>
                    <StatusBar urls={urls} connected={connected} dupes={dupes} />
                    {urls.map(
                        (url: string) =>
                            <DisplayUrl key={url} url={url} />
                    )}
                </>
        }
</div>
    </div>
}


export default DisplayCrawling