import React, { Component } from 'react';
import Backdrop from './Backdrop'


const Modal = (props: any) => {
    // display: props.show ? 'block' : 'none'
    return (
        <>
            <div className="z-10 backdrop"
                onClick={props.modalClosed}
                style={{ display: props.show ? 'block' : 'none' }} />
            <div className='Modal'
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-400vh)',
                    opacity: props.show ? '1' : '0',
                    height: props.modalHeight + 'px'
                }}>
                {props.children}
            </div>
        </>
    )
}

export default Modal;