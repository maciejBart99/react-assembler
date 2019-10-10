import React from 'react';

function RuntimeControl(props) {
    return <div>
        <div className="my-2 mx-auto d-flex">
            <button onClick={()=>{props.execute('START')}} className='btn btn-sm btn-outline-success m-1'><i class="fas fa-play"></i> Uruchom</button>
            <button onClick={()=>{props.execute('NEXT')}} className='btn btn-sm btn-outline-primary m-1'><i class="fas fa-forward"></i> Następna</button>
            <button onClick={()=>{props.execute('RESET')}} className='btn btn-sm btn-outline-danger m-1'>Reset</button>
        </div>
    </div>;
}

export default RuntimeControl;