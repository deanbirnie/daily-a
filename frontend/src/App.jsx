import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import About from './pages/about';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header';

export default function App() {
  return (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/about' element={ <About /> } />
      <Route path='/sign-in' element={ <Signin /> } />
      <Route path='/sign-up' element={ <Signup /> } />
    </Routes>
  </BrowserRouter>
  );
}
