import axios from 'axios';
import React, {useState, useEffect} from 'react';

// set up home page in react frontend

function JumpPage(){
    useEffect(() => {
        // automatically redirect to the sound page
        window.location.href = 'https://frontend.yinghou.homes/playsound';
    }, []);
    return (
        <div>
            <h1>Jump Page</h1>
            <p>This is a page that will automatically redirect to another page</p>
        </div>
    )
}

export default JumpPage;