import React from 'react';
import Register from '../core/register';
import Cell from '../core/cell';
import Interpreter from '../core/interpreter';
import Order from '../core/order';

class Test extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {cmd: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleClick() {

       
          let interpreter=new Interpreter(data=>console.log(data));
          interpreter.loadScript(this.state.value);
          interpreter.execute();
            
          console.log(interpreter);
          console.log(Register.registers);
          console.log(Cell.cells);
    
      }
    
    render() {
      return <div>
          <textarea onChange={this.handleChange}></textarea>
          <button onClick={this.handleClick}>Start</button>
      </div>;
    }
  }

export default Test;
