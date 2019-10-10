import React from 'react';

function Header() {
    return <header>
    <div className='container p-3 d-flex align-items-end justify-content-between'>
        <div className='d-flex align-items-end'>
            <h1 className='text-white m-2 h4'>Psuedo Assembler</h1>
            <h6 className='text-white font-weight-light'>by Maciej Łukasik</h6>
        </div>
        <div className='d-flex align-items-center'>
            <img className='header-icon spin' src='/img/logo192.png'/>
            <h6 className='text-white font-weight-light mx-2 my-0'>React</h6>
            <img className='header-icon spin' src='/img/redux.png'/>
            <h6 className='text-white font-weight-light mx-2 my-0'>Redux</h6>
        </div>
    </div>
  </header>;
}

export default Header;