import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UserPageView.css';


function UserPage() {
    const { userName } = useParams();
    const [content, setContent] = useState('');
    const [singleproject, setSingleproject] = useState([{}])
    const [feedback, setFeedback] = useState('');
    const handlecontent = () => {
        axios.get(`http://localhost:8000/api/predictioncontent/${userName}`)
        .then(res => {
            setContent(res.data);
        });
    }
    const getSingleProjectHandler = () => {
        axios.get(`http://localhost:8000/api/singleprojectprediction/${userName}`)
        .then(res => {
            console.log(res.data)
            setSingleproject(res.data)
        })
    }
    
    const submitFeedback = () => {
        //TODO
        axios.post('http://localhost:8000/api/audiencefeedback/', {
            audience_name: userName,
            feedback: feedback,
        })
        setFeedback('Thank you for the feedback! Hope you enjoyed the experience!')
    }
    useEffect(() => {
        handlecontent();
        getSingleProjectHandler();
    }, []);
    return (
        <div className='userpage'>
            <div className='userPageTitle'>
                <p>The Doorbell or: Echoes from the linguistic AI-Twinned World </p>
                {/* <p></p> */}
            </div >
            {singleproject.map((project, index) => {
                return (
                    <div className='predictionDisplay' key={index}>
                        <p className='predictiontext'>Your AI-twin reflects on: {project.project_name}</p>
                        <p className='predictiontext'>{project.prediction_result}</p>
                    </div>
                );
            }
            )}
            <div className='separteLine'></div>
            <div className='feedback'>
                <p>Your Feedback is important, tell us how your AI-twin simulates you:</p>
            <textarea
                className = 'feedbacktext'
                placeholder='TYPE HERE'
                value={feedback}
                onChange={event => setFeedback(event.target.value)}
            />
            </div>
            <button className='submitfeedback' onClick={submitFeedback}>Submit feedback</button>
        </div>
    );
}

export default UserPage;