import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Main from "./pages/main";
import Login from "./components/login";

const App = () => {
  return (
    <div className="App">
      <Main />
    </div>
  );
};
export default App;
