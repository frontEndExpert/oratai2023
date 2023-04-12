import React from 'react';


const Backdrop = (props: any) => {
   return ( props.show) ? <div className='backdrop' onClick={props.clicked}></div> : <></>
}
export default Backdrop;