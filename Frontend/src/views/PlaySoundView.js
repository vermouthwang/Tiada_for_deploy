import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import { pipeline } from '@xenova/transformers';
// set up home page in react frontend
// const synthesizer = await pipeline('text-to-speech', 'ylacombe/mms-guj-finetuned-monospeaker', {
//     quantized: false, // Remove this line to use the quantized version (default)
// });

// const speaker_embeddings = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';
function PlaySoundPage(){

    const worker = useRef(null);
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const [predictions, setPredictions] = useState([{}])
    //const [predictionscount, setPredictionsCount] = useState(0)
    const getPredictionLengthHandler = () => {
        axios.get('http://localhost:8000/api/predictedresponse/count')
        .then(res => {
            if (res.data) {
                window.location.reload();
            }
        })
    }
    const getPredictionsHandler = () => {
        axios.get('http://localhost:8000/api/predictedresponse/audio/all')
        .then(res => {
            setPredictions(res.data)
            beginSpeech(res.data[0].processed_response)
        })
    }

    const stopSpeech=()=>{
        window.speechSynthesis.cancel();
    }
    addEventListener("beforeunload", stopSpeech)


    useEffect(() => {
        getPredictionsHandler();
        // if (!worker.current) {
        //     // Create the worker if it does not yet exist.
        //     worker.current = new Worker(new URL('./worker.js', import.meta.url), {
        //         type: 'module'
        //     });
        //   }
      
        //   // Create a callback function for messages from the worker thread.
        //   const onMessageReceived = (e) => {
        //     // TODO: Will fill in later
        //   };
      
        //   // Attach the callback function as an event listener.
        //   worker.current.addEventListener('message', onMessageReceived);
      
        //   // Define a cleanup function for when the component is unmounted.
        //   return () => worker.current.removeEventListener('message', onMessageReceived);
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
            <h1>Home Page</h1>
            <p>This is the home page of the task manager app</p>
            {predictions[0].audience_name}
            {predictions[0].processed_response}
            {/* <button onClick={beginSpeech}>Click me</button> */}
            <button onClick={stopSpeech}>Stop</button>
            <button onClick={getPredictionLengthHandler}>Get Prediction Length</button>
        </div>
    )
}

export default PlaySoundPage;