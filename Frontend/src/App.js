import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoView from './components/TodoListView';
import Main from './components/Main';
import {Link} from 'react-router-dom';
function App() {

  const [todoList, setTodolist] = useState([{}])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/api/todo')
    .then(res => {
      setTodolist(res.data)
    })
  },[]);
  
  const addTodoHandler = () => {
    axios.post('http://localhost:8000/api/todo/', {
      title: title,
      description: description
    })
    .then(res => {
      console.log(res);
      const newTodoList = [...todoList];
      newTodoList.push(res.data);
      setTodolist(newTodoList);
    })
  };

  const deleteTodoHandler = (title) => {
    setTodolist(todoList.filter(todo => todo.title !== title))
  };


    
  return (
    <div className="App">
    {/* <Link to="/home">
        <button className="btn btn-primary">Home</button>
    </Link>
    <Link to="/generatePersona">
        <button className="btn btn-primary">Generate Persona</button>
    </Link> */}
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Tiada</a>
        <Link to="/designUpload">
          <button className="btn btn-primary">Upload Design</button>
        </Link>
        <Link to="/generatePersona">
          <button className="btn btn-primary">Generate Persona</button>
        </Link>
        <Link to="/door">
          <button className="btn btn-primary">Door</button>
        </Link>
        <Link to="/playsound">
          <button className="btn btn-primary">Sounds</button>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>

    <div> 
      {/* link to <a href="http://localhost:8000/api/todo">http://localhost:8000/api/todo</a> */}
      <Main />
    </div>
    </div>
  );
}

export default App;
