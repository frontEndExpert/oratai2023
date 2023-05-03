import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeEdit } from '../../redux/features/productsReducer';
import { productsSlice, authSlice } from '../../redux/store';

const EditModal = (props: any) => {

    return (
        <>
            <div className="z-50 backdrop" onClick={props.modalClosed}
                style={{ display: props.show ? 'block' : 'none' }}>
            </div>
            <div className='editmodal'
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </>
    )
}


export default EditModal;
