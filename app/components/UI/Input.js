import React from 'react';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = ['InputElement'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
    }
    if (props.inline ) {
        inputClasses.push('inline');
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                autoComplete={props.autoC} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    name={props.name}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} 
                                value={option.value} >
                            {option.displayValue} 
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className='Input inline'>
            <label className='Label'>{props.label}</label>
            {inputElement}
            <style jsx>{`

            .Input {
                width: 360px;
                padding: 10px;
                box-sizing: border-box;
            }
            
            .Label {
                font-weight: bold;
                display: inline-block;
                width: 115px;
                margin: 8px;
                text-align: left;
            }
            
            .InputElement {
                outline: none;
                border: 1px solid #ccc;
                background-color: white;
                font: inherit;
                padding: 6px 10px;
                display: block;
                width: 200px;
                box-sizing: border-box;
            }
            
            .InputElement:focus {
                outline: none;
                background-color: #ccc;
            }
            
            .Invalid {
                border: 1px solid red;
                background-color: #FDA49A;
            }

            .inline {
                display: inline-block;
            }
            @media (max-width: 360px) {
                .Input {
                     width: 100%;
                }
                .inline {
                display: block;
            }
            }
            `}</style>
        </div>
    );

};

export default input;