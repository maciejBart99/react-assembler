import React,{Component} from 'react';
import RuntimeControl from './runtimeControl';
import Register from '../core/register';
import Interpreter from '../core/interpreter';
import Cell from '../core/cell';
import { connect } from "react-redux";
import {MemoryControl} from './memoryControl';
import {StateRegister} from './stateRegister';
import {RegistersControl} from './registersControl';
import { memoryUpdated,registersUpdated,stateRegisterUpdated,memoryClear } from "../actions";
import {Editor} from './editor';

class WorkAreaPrimitive extends Component {

    constructor(props) {
        super(props);
        this.executeControl=this.executeControl.bind(this);
        this.interpreter=new Interpreter(el=>console.log(el));
        this.interpreter.clearConfiguration();
        this.props.registersUpdated(Register.registers);
        this.props.memoryUpdated(Cell.cells);
        this.props.stateRegisterUpdated(this.interpreter.stateRegister);
    }

    executeControl(order) {
        switch(order) {
            case 'START':
                this.interpreter.clearConfiguration();
                this.interpreter.loadScript(this.props.script);
                this.interpreter.execute();
                this.props.registersUpdated(Register.registers);
                this.props.memoryUpdated(Cell.cells);
                this.props.stateRegisterUpdated(this.interpreter.stateRegister);
                break;
            case 'NEXT':
                break;
            case 'RESET':
                break;
        }
    }

    render() {
        return <main>
            <div className='container'>
                <div className='row'>
                    <div className="col-12 col-md-5 col-lg-4 p-2">
                        <div class='workspace'>
                            <RuntimeControl execute={this.executeControl}/>
                            <MemoryControl/>
                            <StateRegister/>
                            <RegistersControl/>
                        </div>
                    </div>
                    <div className="col-12 col-md-7 col-lg-8 p-2">
                        <div class='workspace'>
                            <Editor/>
                        </div>
                    </div>
                </div>
            </div>
        </main>;
    }
}

const mapStateToProps = (state) => {
    return {
      memory: state.memory,
      registers:state.registers,
      stateRegister:state.stateRegister,
      script:state.script
    }
  };

const mapDispatchToProps = { memoryUpdated,registersUpdated,stateRegisterUpdated,memoryClear };
  
export const WorkArea = connect(mapStateToProps, mapDispatchToProps)(WorkAreaPrimitive);