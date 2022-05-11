import './App.css';

import { Home } from './components/Home';
import { Department } from './components/Department';
import { Employee } from './components/Employee';
import { Navigation } from './components/Navigation';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className='m-4 d-flex justify-content-center'>
          Офіційний сайт компанії MyCompany
        </h3>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/department' element={<Department/>}/>
          <Route path='/employee' element={<Employee/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
