'use client'

import React from 'react';
import Modal from './UI/Modal'
import Auth from './Auth'
import { useSelector, useDispatch } from 'react-redux';
import { authSlice } from '../redux/store';
import { authClose } from '../redux/features/authReducer';
import { withReduxStore } from "../redux/withReduxStore";
import { AnyAction } from "redux";

const AuthModal = (props: any) => {

    const { authShow } = useSelector(authSlice);
    const dispatch = useDispatch();

    // function onAuthOpen() {
    //     dispatch(authOpen() as unknown as AnyAction)
    // }

    function onAuthClose(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        dispatch(authClose() as unknown as AnyAction)
    }

    const modalInstance = authShow ? <Modal
        name="authFormModal"
        show={authShow}
        modalClosed={onAuthClose}>
        <button
            className="btn btn-link auth-btn "
            onClick={onAuthClose}>
            X
        </button>
        <Auth />
    </Modal>
        : <></>;

    return (
        <>
            {modalInstance}
        </>
    )
}

export default withReduxStore(AuthModal);
