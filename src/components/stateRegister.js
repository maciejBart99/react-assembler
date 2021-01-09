import React,{useState} from 'react';
import { connect } from "react-redux";
import { stateRegisterUpdated } from "../actions";

function StateRegisterPrimitive(props) {
    let symbol='Z';
    if(props.stateRegister.value==1) {
        symbol='P';
    } else if(props.stateRegister.value==2) {
        symbol='N';
    }

    return <div className='my-2'>
        <h6>Rejestr stanu</h6>
        <h6 className='font-weight-bold text-muted'>{props.stateRegister.getBin()} {symbol}</h6>
    </div>;
}

const mapStateToProps = (state) => {
    return {
      stateRegister:state.stateRegister
    }
  };

const mapDispatchToProps = { stateRegisterUpdated};
  
export const StateRegister = connect(mapStateToProps, mapDispatchToProps)(StateRegisterPrimitive);