import React from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import {closeEdit} from '../../redux/features/productsReducer';
import {productsSlice, authSlice } from '../../redux/store';

const EditModal = (props: any) => {
    const dispatch = useDispatch();
    const { editShow } = useSelector(productsSlice);

    // shouldComponentUpdate ( nextProps, nextState ) {
    //     return nextProps.editShow !== props.editShow || nextProps.children !== props.children;
    // }
      
        return (
            <>
                <div className="backdrop" onClick={()=>dispatch( closeEdit())}
                style={{display: props.show ? 'block' : 'none'}}>
                </div>
                <div className='editmodal' 
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    {props.children}
                </div>
                <style jsx>{`
                .backdrop {
                    width: 100%;
                    height: 100%;
                    position: fixed;
                    z-index: 100;
                    left: 0;
                    top: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                }
                .editmodal {
                    position: fixed;
                    z-index: 500;
                    background-color: white;
                    width: 80%;
                    height: 800px;
                    border: 1px solid #ccc;
                    box-shadow: 1px 1px 1px black;
                    padding: 16px;
                    left: 15%;
                    top: 30px;
                    box-sizing: border-box;
                    transition: all 0.3s ease-out;
                }
                
                @media (max-width: 600px) {
                    .Modal {
                        width: 300px;
                        height: 270px;
                        left: calc(50% - 250px);
                    }
                }
                `}</style>
            </>
        )
}


export default EditModal;
