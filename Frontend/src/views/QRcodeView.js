import React from 'react';
//import QRCode from 'qrcode.react'; // Ensure you have installed qrcode.react or similar library
import QRCode from "react-qr-code";
function UserQRCode({ userName }) {
    // Construct the URL
    const siteUrl = 'http://localhost:3000/user/';
    const userUrl = `${siteUrl}${encodeURIComponent(userName)}`;

    return (
        <div style={{ padding: '2px', opacity: 1, mixBlendMode: 'soft-light' }}>
            <QRCode 
                size={256}
                style={{ height: "auto", maxWidth: "30%", width: "30%" }}
                value={userUrl}
                viewBox={`0 0 100 100`}
                bgColor='#8B8383'
                level='L'
                fgColor='#A1FFAB'
            />
        </div>
    );
}

export default UserQRCode;