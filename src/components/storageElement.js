import React,{useState} from 'react';

function StorageElement(props) {
    const [toggled, setToggled] = useState('collapse-toggled');

    return <div>
        <div className="collapse-label p-1 m-1 px-3" onClick={() => (toggled=='collapse-toggled')?setToggled(''):setToggled('collapse-toggled')}>{props.storageType} {props.storage.adress} <span className='text-muted'>{props.storage.getDec()}</span></div>
        <div className={toggled}>
            <h6 className='pl-4'>Dec: {props.storage.getDec()}</h6>
            <h6 className='pl-4'>Bin: {props.storage.getBin()}</h6>
            <h6 className='pl-4'>Hex: {props.storage.getHex()}</h6>
        </div>
    </div>;
}

export default StorageElement;