import React from 'react';
import croppedLogo from "../assets/images/croppedLogo.png";

export default function Header() {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '10px 20px',
        borderRadius: '25px',
        width: '50%',
        margin: '0 auto',
        marginTop: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo - Left */}
        <img
          src={croppedLogo}
          alt="Logo"
          style={{ height: '50px' }}
        />

        {/* Links - Right */}
        <div
          style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center',
          }}
        >
          <a href="/">Home</a>

          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}