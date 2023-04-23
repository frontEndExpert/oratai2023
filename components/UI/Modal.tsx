import React, { Component } from 'react';
import Backdrop from './Backdrop'


const Modal = (props: any) => {

        return (
            <>
                <Backdrop show={props.show} clicked={props.modalClosed} />
                <div  className='Modal'
                    style={{  transform: props.show ? 'translateY(0)' : 'translateY(-400vh)',
                        opacity: props.show ? '1' : '0' ,
                        height: props.modalHeight + 'px'
                        // display: props.show ? 'block' : 'none'
                    }}>
                    {props.children}
                </div>
                
            </>
        )
}

export default Modal;