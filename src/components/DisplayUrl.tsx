import { GiSadCrab } from 'react-icons/gi'
import { constants } from './../styles';


type props = { url: string }

const DisplayUrl = ({ url }: props) => {


    return (
        <div className='link-container'>
            <GiSadCrab  width={20} height={20} />
            <a className='link' href={url} rel="noreferrer" target="_blank">{url} </a>
        </div>
    )
}

export default DisplayUrl

