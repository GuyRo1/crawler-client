import { FC, useRef, FormEvent, CSSProperties } from "react";
type formDataType = {
    url: string;
    depth: number;
    max: number;
}

const formDataInit: formDataType
    = {
    url: '',
    depth: 0,
    max: 0
}

const validateForm = (formData: formDataType) =>
    formData.depth !== formDataInit.depth &&
    formData.max !== formDataInit.max &&
    formData.url !== formDataInit.url



const RequestCrawlingForm: FC = () => {


    const formDataRef = useRef<formDataType>(formDataInit)

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (validateForm(formDataRef.current)) {
            console.log(formDataRef.current);
        }
    };

    const changeDepth = (event: any) => {


        formDataRef.current.depth = event.target.value
    }

    const changeMax = (event: any) => {

        formDataRef.current.max = event.target.value
    }

    const changeUrl = (event: any) => {

        formDataRef.current.url = event.target.value
    }


    return (
        <form onSubmit={onSubmit} className='form-container'>
            <div className="url input-container">
                <label htmlFor="url">Url</label>
                <input id='url' placeholder="url" type='text' onChange={changeUrl}></input>
            </div>
            <div className="depth input-container">
                <label htmlFor='depth'>Depth</label>
                <input id='depth' placeholder="depth" type='number' onChange={changeDepth}></input>
            </div>
            <div className="max input-container">
                <label htmlFor="max">Max</label>
                <input id='max' placeholder="max" type='number' onChange={changeMax}></input>
            </div>
            <div className="button-container">
            <button className='button' type="submit">🦀 Start Crawling 🦀</button>
            </div>
        </form>
    )
}

export default RequestCrawlingForm
