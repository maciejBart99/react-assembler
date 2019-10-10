import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from "./store";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import { memoryUpdated,registersUpdated } from "./actions";

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
