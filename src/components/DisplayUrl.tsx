import { useMemo } from 'react'
import { GiSadCrab } from 'react-icons/gi'
import { useCallback } from 'react';

type props = { url: string }

const DisplayUrl = ({ url }: props) => {
    const displayUrl = useMemo(() =>
        url.length > 30 ? url.slice(0, 30) + '...' : url
        , [url])



    return (
        <div style={{ display: 'flex', color: 'blue' }}>
            <GiSadCrab width={20} height={20} />
            <a href={url} target="_blank">{displayUrl} </a>
        </div>
    )
}

export default DisplayUrl