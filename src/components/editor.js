import React,{Component} from 'react';
import RuntimeControl from './runtimeControl';
import Register from '../core/register';
import Interpreter from '../core/interpreter';
import Cell from '../core/cell';
import { connect } from "react-redux";
import {MemoryControl} from './memoryControl';
import {RegistersControl} from './registersControl';
import { memoryUpdated,registersUpdated,scriptUpdated } from "../actions";

class EditorPrimitive extends Component {

    constructor(props) {
        super(props);
        this.editor = React.createRef()
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event) {
        this.props.scriptUpdated(this.extractContent(event.target.innerHTML));
        this.setState({ state: this.state });
    }

    extractContent(s) {
        s=String(s).split('<div>').join('\n<div>');
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.textContent || span.innerText;
      };
          

    render() {
        let lines=[];

        let height=(this.editor.current)?this.editor.current.offsetHeight:600;

        for(let i=1;i<(height*(25/600));i++) {
            lines.push(<span>{i}<br/></span>);
        }

        return <div className='p-2'>
            <div className='main-editor'>
                <div className='row-counter'>{lines}</div>
                <div ref={this.editor} contentEditable='true' onKeyDown={this.handleChange} className='editor-textfield'>
                    <div>Tutaj wpisz swój kod...</div>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
      memory: state.memory,
      registers:state.registers,
      script:state.script
    }
  };

const mapDispatchToProps = { memoryUpdated,registersUpdated,scriptUpdated };
  
export const Editor = connect(mapStateToProps, mapDispatchToProps)(EditorPrimitive);