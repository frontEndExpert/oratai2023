import React from 'react';

const EditModal = (props: any) => {
    // style={{ display: props.show ? 'block' : 'none' }}
    return (
        <>
            <div className="bg-black h-full w-full opacity-50 top-0 z-15 z-50 fixed "
                onClick={props.modalClosed} ></div>
            <div className='bg-white text-black '
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                    display: 'block',
                    position: 'fixed',
                    zIndex: 60,
                    top: '30px',
                    left: '25%',
                    boxSizing: 'border-box',
                    width: '600px',
                    height: '600px',
                    padding: '20px',
                    boxShadow: '1px 1px 1px black',
                    border: '1px solid #ccc',
                    margin: 'auto',
                }}>
                {props.children}
            </div>
        </>
    )
}


export default EditModal;
