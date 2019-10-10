import React,{useState} from 'react';
import StorageElement from './storageElement';
import { connect } from "react-redux";
import { memoryUpdated,registersUpdated } from "../actions";

function RegistersControlPrimitive(props) {

    let registers=props.registers.map(el=><StorageElement storageType='Rejestr' storage={el}/>);

    const [toggled, setToggled] = useState('collapse-toggled');

    return <div>
        <h6 onClick={() => (toggled=='collapse-toggled')?setToggled(''):setToggled('collapse-toggled')} className='toggle-main-label'>Podgląd rejestrów</h6>
        <div className={toggled}>
        <hr/>
        {registers}
        <hr/>
        </div>
    </div>;
}

const mapStateToProps = (state) => {
    return {
      memory: state.memory,
      registers:state.registers
    }
  };

const mapDispatchToProps = { memoryUpdated,registersUpdated };
  
export const RegistersControl = connect(mapStateToProps, mapDispatchToProps)(RegistersControlPrimitive);