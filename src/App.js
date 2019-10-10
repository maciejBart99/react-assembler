import React from 'react';
import Header from './components/header';
import { connect } from "react-redux";
import { memoryUpdated,registersUpdated } from "./actions";
import {WorkArea} from './components/workArea';

function App() {
  return (
    <div className="App">
      <Header/>
      <WorkArea/>
    </div>
  );
}

export default App;

