import React from 'react';
import { ProgressBar } from 'react-materialize';
import imgSrc from '../../assets/images/favicon.ico';
import '../../assets/css/splash.css' 
/**
 * Splash screen of app
 * render when app is on load start
 * but when app is loaded hide it
 */
const Splash = props => (
    <div className='pink splash-screen center'>
      <div className="splash-content">
        <img src={imgSrc} alt='awid logo' /> <br/>
        <ProgressBar className='purple progressbar' />
      </div>
    </div>
);
export default Splash;