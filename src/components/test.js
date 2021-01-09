import React from 'react';
import Interpreter from '../core/interpreter';

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
          const interpreter=new Interpreter(data=>console.log(data));
          interpreter.loadScript(this.state.value);
          interpreter.execute();
      }
    
    render() {
      return <div>
          <textarea onChange={this.handleChange}></textarea>
          <button onClick={this.handleClick}>Start</button>
      </div>;
    }
  }

export default Test;
