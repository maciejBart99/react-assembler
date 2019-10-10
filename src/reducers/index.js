import { combineReducers } from "redux";
import { memory } from "./memory";
import { registers } from "./registers";
import {stateRegister} from './stateRegister';
import {script} from './script';

export default combineReducers({
  memory,registers,script,stateRegister
});