import axios from 'axios';
import React, {useState, useEffect} from 'react';
import GeneratedPersonasView from '../components/GeneratedPersonasView';
import './GeneratePersonaView.css';
// set up home page in react frontend

function GeneratePersonaPage(){
    const [collection, setCollection] = useState('')
    const [number, setNumber] = useState(0)
    const [demands, setDemand] = useState('')
    const [testproblems, setTestProblem] = useState('')
    const [personaList, setPersonaList] = useState([{}])

    const generatePersonaHandler = () => {
        axios.post('http://localhost:8000/api/generate_personas/', {
             // You'll need to determine how you get this value
            case_name: "Some Case Name",
            collection_name: collection,
            number: number,
            demands: demands,
            test_problems: testproblems
        })
        .then(res => {
            getPersonaHandler(collection);
            // const newPersonaList = [...personaList];
            // newPersonaList.push(res.data);
            // setPersonaList(res.data);
        })
    }
    // // useEffect(() => {
    // //     //Runs on the first render
    // //     //And any time any dependency value changes
    // //   }, [prop, state]);
    // useEffect(() => {
    //     getPersonaHandler(collection);
    // }, [collection]);
    
    const getPersonaHandler = (collection) => {
        axios.get(`http://localhost:8000/api/generate_personas/${collection}`)
        .then(res => {
            //console.log(res.data);
            //test any input value to setPersonaList
            setPersonaList(res.data)
            console.log(personaList)
        })
    }
    return (
        <div>
            <div className="testcss">
                <span className="leftclientbar">
                <p className="functiontitle">Generate Your Users</p>
                    <input className='mb-2 form-control' type='number' onChange={event=> setNumber(event.target.value)} placeholder='Number of Users' />
                    {/* number input place for number */}
                    <input className='mb-2 form-control' type='text' onChange={event=> setCollection(event.target.value)} placeholder='Collection Name' />
                    <input className='mb-2 form-control' type='text' onChange={event=> setDemand(event.target.value)} placeholder='Demands' />
                    <input className='mb-2 form-control' type='text' onChange={event=> setTestProblem(event.target.value)} placeholder='Test Problems' />
                    <button className='btn btn-outline-primary mx-2 mb-3' style={{'borderRadius':'50px','fontWeight':'bold'}} onClick={generatePersonaHandler}>Generate</button>
                </span>
            <div>
                <div className="card-body">
                <h5 className="card text-dark bg-warning py-1 mb-3">Generated Personas</h5>
                <GeneratedPersonasView personas={personaList} />
            </div>
            </div>
            </div>

        </div>
    )
}

export default GeneratePersonaPage;