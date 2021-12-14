import React from 'react';
import Markup from './markup/Markup';
import './css/plugins.css';
import './css/style.css';
import './css/templete.css';
import './css/skin/skin-1.css';
import './plugins/slick/slick.min.css';
import './plugins/slick/slick-theme.min.css';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './markup/Context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Markup />
        </AuthProvider>
        <ToastContainer />
    </div>
  );
}

export default App;
