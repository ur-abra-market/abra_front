import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main"
import NavBar from "./components/ui/navBar";


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />}></Route>
        <Route path="help" element={<p>Help</p>} />
      </Routes>
    </div>
  );
}

export default App;
