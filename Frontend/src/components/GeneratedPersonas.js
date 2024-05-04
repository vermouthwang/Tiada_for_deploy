import axios from 'axios';
import React, {useState, useEffect} from 'react';

function PersonaItem(props){
    return (
        <div className="list-group-item justify-content-center align-items-center mx-auto" style={{"width":"400px", "backgroundColor":"#f4f4f4", "marginTop":"20px"}}>
            <div>
                {/* <span key={props.persona.id} style={{ fontWeight: 'bold' }}>{props.persona.name}</span>  
                {props.persona.description}
                <button className='btn btn-outline-danger mx-2 mb-3' style={{'borderRadius':'50px','fontWeight':'bold'}} 
                onClick={() => props.onDelete(props.persona.name)}>Delete</button> */}
                <span style={{ fontWeight: 'bold' }}> {props.persona.name} </span>
                <span style={{ fontWeight: 'bold' }}> {props.persona.age} </span>
                <h6 style={{ fontWeight: 'bold' }}> {props.persona.occupation} </h6>
                <h6>{props.persona.characteristic} </h6>
                <button className='btn btn-outline-danger mx-2 mb-3' style={{'borderRadius':'50px','fontWeight':'bold'}}> Delete </button>
            </div>
        </div>
    )
}

export default PersonaItem;