import { useContext } from "react"
import { socketIoContext } from './../context/socketIoContext';


const DisplayCrawling = () => {


    const urls = useContext(socketIoContext)

    return <div className="display-container">
        {
            urls.length === 0 &&
            <>
                <p>Fill the form and press submit!</p>
                <p>Happy Crawling</p>
            </>
        }


    </div>
}


export default DisplayCrawling