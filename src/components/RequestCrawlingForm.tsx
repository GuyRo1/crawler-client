import { FC, useRef, FormEvent, useContext } from "react";
import { formDataType } from "../models/FormData";
import { socketIoContext } from './../context/socketIoContext';


const formDataInit: formDataType
    = {
    url: 'https://www.mako.co.il',
    depth: 1,
    max: 1
}

const validateForm = (formData: formDataType) =>
    formData.depth > 0 &&
    formData.max > 0 &&
    formData.url !== ""



const RequestCrawlingForm: FC = () => {


    const { status, connect, restart } = useContext(socketIoContext)

    const formDataRef = useRef<formDataType>(formDataInit)

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (validateForm(formDataRef.current)) {
            if (status !== 'connected')
                connect(formDataRef.current)
            else
                restart(formDataRef.current)
        } else {
            console.log(formDataRef.current);
        }
    };

    const changeDepth = (event: any) => {


        formDataRef.current.depth = parseInt(event.target.value)
    }

    const changeMax = (event: any) => {

        formDataRef.current.max = parseInt(event.target.value)
    }

    const changeUrl = (event: any) => {

        formDataRef.current.url = event.target.value
    }


    return (
        <form onSubmit={onSubmit} className='form-container'>
            <div className="url input-container">
                <label htmlFor="url">Url</label>
                <input defaultValue="https://www.mako.co.il/" id='url' placeholder="url" type='text' onChange={changeUrl}></input>
            </div>
            <div className="depth input-container">
                <label htmlFor='depth'>Depth</label>
                <input defaultValue={1} min='1' id='depth' placeholder="depth" type='number' onChange={changeDepth}></input>
            </div>
            <div className="max input-container">
                <label htmlFor="max">Max</label>
                <input defaultValue={1} min='1' id='max' placeholder="max" type='number' onChange={changeMax}></input>
            </div>
            <div className="button-container">
                <button className='button' type="submit">🦀 Start Crawling 🦀</button>
            </div>
        </form>
    )
}

export default RequestCrawlingForm
