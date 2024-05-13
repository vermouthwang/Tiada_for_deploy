import axios from 'axios';
import React, {useState, useEffect} from 'react';
import './DoorView.css'
import UserQRCode from './QRcodeView';

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'
const thisindex = Math.floor(Math.random() * 100000)
function DoorView(){
    const texts = [
        'Hello!!! <br/> Welcome to ADV 9703: MDes Open Project: Physical Realms Synthetic Realities. <br/> Before starting your journey, we\'d like to ask you a few questions. <br/> Please press the arrow button to start.',
        'Can you introduce yourself? What is your name? What is your age? Press the dialup button to record your answer.',
        'Are you a student or a faculty at GSD community? What is your major or profession?',
        'Why you come to this exhibition?',
        'How would you describe yourself? Your characteristics, your interests,etc. We would like to hear about you in details to understand you better.',
        'How do you define the boundary between digital and physical world? Do you believe these boundaries are rigid or fluid?',
        "What are your thoughts on AI's role in shaping our daily experiences and the future of human work?",
        'How do you think of the technologies like AR, VR, and the Metaverse blurring the lines between realities? How do you personally relate to these technologies?',
        'Please scan the QR code and enjoy your journey.'
    ]
    const [textIndex, setTextIndex] = useState(0);
    const [isListening, setIsListening] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [note, setNote] = useState(null)
    const [savedNotes, setSavedNotes] = useState([])
    const [currentaudiencename, setCurrentAudienceName] = useState('')
    const [checkifindex8, setCheckIfIndex8] = useState(false)
    useEffect(() => {
        handleListen();
      }, [isListening])

    useEffect(() => {
      console.log("textIndex", textIndex);
      if (textIndex === 8) {
          // Stop listening when the last text is reached
          setIsListening(false);
          // Delayed action to refresh the page
          const timer = setTimeout(() => {
              window.location.reload();
          }, 180000); // 90000 ms = 90 seconds
          // Cleanup the timeout to prevent multiple reloads
          return () => clearTimeout(timer);
      }
    }, [textIndex]);

    const handleListen = () => {
      if (isListening) {
        mic.start()
        mic.onend = () => {
          console.log('continue..')
          mic.start()
        }
      } else {
        mic.stop()
        mic.onend = () => {
          console.log('Stopped Mic on Click')
        }
      }
      mic.onstart = () => {
        console.log('Mics on')
      }
      mic.onresult = event => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        console.log(transcript)
        setNote(transcript)
        mic.onerror = event => {
          console.log(event.error)
        }
      }
    }
    //random_index = random.randint(0, 10000)
    const handleSaveNote = () => {
        if (!note) return
        setSavedNotes([...savedNotes, note])
        let previous_length = 0
        let curr_len = savedNotes.length
        for (let chars in savedNotes[curr_len-1]) {
            previous_length += 1
        }
        let new_str = ''
        for (let j=previous_length; j<note.length; j++) {
            new_str += note[j]}
        console.log("new input", new_str)
        axios.post('https://backend.yinghou.homes/api/audio/', {
            index: thisindex,
            audio_note: [new_str],
        })
        setNote('')
    }

    const handleButtonClick = () => {

        setTextIndex((currentTextIndex) => {
            // Increment the text index or reset to 0 if it's the last text in the array
            const nextTextIndex = currentTextIndex + 1 < texts.length ? currentTextIndex + 1 : 0;
            return nextTextIndex;
        });
    };
    const handledouble = () => {
      handleButtonClick()
      handleSaveNote()
      if (textIndex === 7) {
        setIsLoading(true)
        axios.get(`https://backend.yinghou.homes/api/parseaudio/${thisindex}`)
        .then(res => {
            setCurrentAudienceName(res.data.audiencename)
            axios.post('https://backend.yinghou.homes/api/audienceprediction/', {
              index: res.data.index,
              audiencename: res.data.audiencename,
              audience_description: res.data.audience_description,
            }).then(res => {
              setIsLoading(false)
            })
        })
        //window.location.reload(); // refresh page
      }
    }
    // const addAudioElement = async (blob) => {
    //     const url = URL.createObjectURL(blob);
    //     const audio = document.createElement("audio");
    //     audio.src = url;
    //     audio.controls = true;
    //     document.body.appendChild(audio);
    // };

    return (
        <div className='doorbackground'>
          {/* //!isLoading */}
          { (textIndex == 8 && !isLoading && currentaudiencename!= '')? 
            <div>
            <div className='finaltextdisplay'>
              <p>{texts[8]}</p>
            </div>
            <div style={{ padding: '2px', opacity: 1, mixBlendMode: 'soft-light'}}>
              <UserQRCode userName={currentaudiencename} />
            </div> 
            </div>
            :
            <div className='textdisplay'>
            {isLoading? 
              <div className="loader-container">
                <div className="loader">
                  Ringing... This may take 1 min, please wait.
                  This work is a part of the MDes OP Physical Realms Synthetic Realities created by Yinghou.
                  Amid the rising tide of large language models and token-based generation, AI is redefining digital realities through language, echoing philosophy idea of Ludwig Wittgenstein: "The sentence is a picture of reality." 
                  Language shapes a conceivable scenario, linking meaning to conditions of truth.
                  This project explores the realm of digital-twinned personas, utilizing language-based AI pipelines to reconstruct human realities in the digital sphere by engineering language description augmented AI agent. 
                  We are now simulating you into an AI agents that reflect your reactions, behaviors, preferences, and interactions via your previous answer. Please wait for a moment.
                </div>
              </div> :
              <div>
              <div dangerouslySetInnerHTML={{ __html: texts[textIndex] }}></div>
              {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
              <p>{note}</p>
              </div>
            }
                
            </div>
            }
            <div className="buttondiv">
            <button 
              className={`audiobutton ${isListening ? 'pressed' : ''}`}
              onClick={() => setIsListening(prevState => !prevState)} >
            </button>
            <button 
              className='dooraudiobutton'
              onClick={handledouble} >
            </button>
            </div>
        </div>
    )
}
// [handleButtonClick, handleSaveNote]

export default DoorView;