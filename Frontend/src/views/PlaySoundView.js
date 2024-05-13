import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import { pipeline } from '@xenova/transformers';

function PlaySoundPage(){

    const worker = useRef(null);
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const [predictions, setPredictions] = useState([{}])
    const [predictionlenchange, setPredictionLenChange] = useState(false)
    const [count, setCount] = useState(0)
    //const [predictionscount, setPredictionsCount] = useState(0)
    const getPredictionLengthHandler = () => {
        axios.get('https://backend.yinghou.homes/api/predictedresponse/count')
        .then(res => {
            console.log('getting prediction length', res.data)
            if (res.data === true) {
                stopSpeech();
                //refresh the page
                window.location.reload();
            }
        })
    }
    const getPredictionsHandler = () => {
        axios.get('https://backend.yinghou.homes/api/predictedresponse/audio/all')
        .then(res => {
            setCount(res.data.length)
            setPredictions(res.data[res.data.length-1])
            beginSpeech(res.data[res.data.length-1].processed_response)
        })
    }

    const stopSpeech=()=>{
        window.speechSynthesis.cancel();
    }
    addEventListener("beforeunload", stopSpeech)


    useEffect(() => {
        getPredictionsHandler();

        const interval = setInterval(() => {
            getPredictionLengthHandler();
        }, 100000); // 20000 ms = 20 seconds

        return () => clearInterval(interval);
    }, []);


    const beginSpeech=(giventext)=>{
        const text = giventext;
        const value = new SpeechSynthesisUtterance(text);
        console.log(value)
        window.speechSynthesis.speak(value);
    }
    // const texttospeech = () => {
    //     setDisabled(true);
    //     worker.current.postMessage({ text: "Hello, world!" });
    // }
    return (
        <div>
            <h1>Sound Page</h1>
            <p>This is the home page of the task manager app</p>
            {predictions.audience_name}
            {predictions.processed_response}
            {/* <button onClick={beginSpeech}>Click me</button> */}
            <button onClick={stopSpeech}>Stop</button>
            <button onClick={getPredictionLengthHandler}>Get Prediction Length</button>
        </div>
    )
}

export default PlaySoundPage;