import axios from 'axios';
import React, {useState, useEffect} from 'react';

function TodoItem(props) {
    const deleteTodoHandler = (title) => {
        console.log(title)
        axios.delete(`https://backend.yinghou.homes/api/todo/${title}`)
        .then(res => {
            console.log(res.data);
            props.onDelete(title);
        }
            )}

    return (
        <div className="list-group-item justify-content-center align-items-center mx-auto" style={{"width":"400px", "backgroundColor":"#f4f4f4", "marginTop":"20px"}}>
            <p>
                <span key={props.todo.id} style={{ fontWeight: 'bold' }}>{props.todo.title}</span>  
                {props.todo.description}
                <button className='btn btn-outline-danger mx-2 mb-3' style={{'borderRadius':'50px','fontWeight':'bold'}} 
                onClick={() => deleteTodoHandler(props.todo.title, props.todo.title)}>Delete</button>
            </p>
        </div>
    )
}

export default TodoItem;