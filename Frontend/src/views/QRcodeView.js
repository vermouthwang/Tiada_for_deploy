import React from 'react';
//import QRCode from 'qrcode.react'; // Ensure you have installed qrcode.react or similar library
import QRCode from "react-qr-code";
function UserQRCode({ userName }) {
    // Construct the URL
    const siteUrl = 'https://frontend.yinghou.homes/user/';
    const userUrl = `${siteUrl}${encodeURIComponent(userName)}`;

    return (
        <div style={{ padding: '0px', mixBlendMode: 'normal'}}>
            <QRCode 
                size={256}
                style={{ height: "auto", maxWidth: "40%", width: "40%" }}
                value={userUrl}
                viewBox={`0 0 110 100`}
                bgColor='#2E3E2F'
                level='L'
                fgColor='#A1FFAB'
            />
        </div>
    );
}

export default UserQRCode;