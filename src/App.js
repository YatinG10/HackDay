// import './App.css';
// import Graph from './components/Graph';

// function App() {
//   return (
//     <div className="App">
//       <Graph />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Graph from './components/Graph';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './state-farm-insurance-vector-logo.png';
import SearchBar from "./components/SearchBar/SearchBar";
import BookData from "./components/SearchBar/Data.json";
import TableCell from "@mui/material/TableCell";

function App() {
  return (
    <>
      <div className="top">
        <img src={logo} className = "navbar-logo" alt='logo' />
        Nexus
      </div>
      <TableCell component="th" scope="row">
        <SearchBar placeholder="Enter Name" data={BookData} />
      </TableCell>
      <Graph />
    </>
  );
}

export default App;
