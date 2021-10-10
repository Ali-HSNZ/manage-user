import User from "../User/User";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Main.css'


function App() {
  return (
  <>
    <ToastContainer autoClose={6000} rtl={false} theme={"dark"}/>
   
    <User/>

</>
  
  );
}

export default App;
