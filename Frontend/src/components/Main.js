import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoItem from './Todo';
import GeneratePersonaPage from '../views/GeneratePersonaView';
import HomeView from '../views/HomeView';
import InterfacesView from '../views/InterfacesView';
import DoorView from '../views/DoorView';
import PlaySoundPage from '../views/PlaySoundView';
import UserPage from '../views/UserPageView';
import JumpPage from '../views/jumpsubView';
// import Home from '../pages/Home';
// import Signup from '../pages/Signup';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/home' element={<HomeView/>}></Route>
      <Route exact path='/generatePersona' element={<GeneratePersonaPage/>}></Route>
      <Route exact path='/designUpload' element={<InterfacesView/>}></Route>
      <Route exact path='/door' element={<DoorView/>}></Route>
      <Route exact path='/playsound' element={<PlaySoundPage/>}></Route>
      <Route exact path='/user/:userName' element={<UserPage/>}></Route>
      <Route exact path='/jump' element={<JumpPage/>}></Route>
    </Routes>
  );
}

export default Main;