import React from 'react';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logoContainer">
      <img src="/image/logo.png" width="40px" height="40px" alt="logo" />
      <div style={{marginLeft: "0.8rem",}}>
        <h2 style={{fontSize: "24px", fontWeight: "700", color: "white"}}>CodePad</h2>
        <p style={{fontSize: "13px", color: "#5ee3a8", marginTop: "-0.2rem"}}>Realtime Collaboration</p>
      </div>
    </div>
  );
};

export default Logo;


