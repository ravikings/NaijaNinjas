import React, {useEffect} from 'react';
import Markup from './markup/Markup';
import './css/plugins.css';
import './css/style.css';
import './css/templete.css';
import './css/skin/skin-1.css';
import './css/custom.css';
import './plugins/slick/slick.min.css';
import './plugins/slick/slick-theme.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from "react-redux";
import {getCurrentUser} from "./markup/Pages/Auth/Redux/AuthActions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {dispatch(getCurrentUser())},[])

  return (
    <div className="App">
          <Markup />
        <ToastContainer />
    </div>
  );
}

export default App;
