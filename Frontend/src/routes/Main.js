import React from 'react'
import {  Route } from 'react-router-dom';
import Footer from '../layout/main/Footer'
// import Navbar from '../layout/main/Navbar';
const Main=(props)=> {
    return (
        <>

   <Route exact  path={props.path} component={props.component} />   

<Footer />
      
        </>
    )
}
export default Main;