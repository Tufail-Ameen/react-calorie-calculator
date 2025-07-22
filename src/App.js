import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Information from './Components/Information'
import Weight from './Components/Weight'
// import PhysicalChange from './Components/PhysicalChange'
import Result from './Components/Result'
import "./App.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Information />} />
          <Route path="/Weight" element={<Weight />} />
          {/* <Route path="/PhysicalChange" element={<PhysicalChange />} /> */}
          <Route path="/Result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
