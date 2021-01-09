import React,{Component} from 'react';
import { connect } from "react-redux";
import { memoryUpdated,registersUpdated,scriptUpdated } from "../actions";
import ContentEditable from 'react-contenteditable';

class EditorPrimitive extends Component {

    constructor(props) {
        super(props);
        this.editor = React.createRef()
        this.handleChange = this.handleChange.bind(this);
        this.state = {html: "Wpisz swój kod..."};
      }

    handleChange(event) {
        this.props.scriptUpdated(this.extractContent(event.target.innerHTML));
        this.setState({html: event.target.value});
    }

    extractContent(s) {
        s=String(s).split('<div>').join('\n<div>');
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.textContent || span.innerText;
      };
          

    render() {
        const height=(this.editor.current)?this.editor.current.offsetHeight:600;
        const lines = Array.from(new Array(height*(25/600)).keys()).map(i => <span key={i}>{i}<br/></span>);

        return <div className='p-2'>
            <div className='main-editor'>
                <div className='row-counter'>{lines}</div>
                <ContentEditable innerRef={this.editor} html={this.state.html} disabled={false} onChange={this.handleChange} className='editor-textfield'/>
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