import React from 'react';
import Modal from './UI/Modal'
import Auth from './Auth'
import { useSelector, useDispatch  } from 'react-redux';
import { authSlice } from '../redux/store';
import { authClose } from '../redux/features/authReducer';


const AuthModal = (props: any) => {

    const { authShow } = useSelector(authSlice);
    const dispatch = useDispatch();


    const modalInstance = authShow ? <Modal 
            name="authFormModal" 
            show={authShow} 
            modalClosed={() => dispatch(authClose())}>
            <button className="btn btn-link auth-btn" onClick={() => dispatch(authClose())}>X</button>
        <Auth />
    </Modal>
    : <></>;

    return (
        <>
            {modalInstance}
        </>
    )
}

export default AuthModal;

