import { useContext } from "react"
import { socketIoContext } from './../context/socketIoContext';
import DisplayUrl from './DisplayUrl';



const DisplayCrawling = () => {

    const { urls } = useContext(socketIoContext)

    return <div className="display-container">
        {
            urls.length === 0 ?
                <>
                    <p>Fill the form and press submit!</p>
                    <p>Happy Crawling</p>
                </> :
                urls.map(
                    (url: string) =>
                    <DisplayUrl key={url} url={url}/>
                )
        }

    </div>
}


export default DisplayCrawling