import React,{useState} from 'react';
import StorageElement from './storageElement';
import { connect } from "react-redux";
import { memoryUpdated,registersUpdated } from "../actions";

function MemoryControlPrimitive(props) {
    const cells=props.memory.length == 0 ? <p className='text-muted'>Brak komórek do wyświetlenia</p> : props.memory.map(el=><StorageElement key={el.address} storageType='Komórka' storage={el}/>);
    const [toggled, setToggled] = useState('collapse-toggled');

    return <div className='my-2'>
        <h6 onClick={() => (toggled=='collapse-toggled')?setToggled(''):setToggled('collapse-toggled')} className='toggle-main-label'>Podgląd pamięci</h6>
        <div className={toggled}>
        <hr/>
        <div className='py-2'>
        {cells}
        </div>
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
  
export const MemoryControl = connect(mapStateToProps, mapDispatchToProps)(MemoryControlPrimitive);