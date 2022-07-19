import { FC } from "react";
import './App.css'
import SocketIoContextProvider from './context/socketIoContext';
import RequestCrawlingForm from './components/RequestCrawlingForm'
import DisplayCrawling from './components/DisplayCrawling';



const App: FC = () => {
  return (
    <SocketIoContextProvider>
      <div className='container'>
        <RequestCrawlingForm />
        <DisplayCrawling />
      </div>
    </SocketIoContextProvider>
  );
}

export default App;

