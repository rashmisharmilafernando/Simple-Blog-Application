import React from "react";
import Header from "./layout/header"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends React.Component<any, any>{

  render() {
    return (
      <div>
        <BrowserRouter>
        <Header />
          <Routes>
            
          </Routes>
          
        </BrowserRouter>
      </div>
    );
  }

}

export default App