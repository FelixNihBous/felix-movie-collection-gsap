import { useState } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from './components/Home'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
