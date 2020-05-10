import React, { useState } from 'react';
import './Input.css';

const Input = (props) => {
    return (
        <div className="input">
            <div className="row">
                {props.type === 'submit' ?
                    <div className="col-md-12 col-sm-12 inputDiv">
                        <input
                            type={props.type}
                            className="connectBtn btn btn-outline-info btn-block"
                            id={props.name}
                            value={props.value}
                            onClick={props.onClick}
                        />
                    </div> :
                    <React.Fragment>
                        <div className="col-12 labelDiv">
                            <label className="lableInput" htmlFor={props.name}>{props.placeHolder}</label>
                        </div>
                        <div className="col-12 inputDiv">
                            <input
                                type={props.type}
                                className="form-control inputStyle"
                                placeholder={props.placeHolder}
                                id={props.name}
                                onChange={e => props.onChange(e.target.value)}
                                value={props.value}
                            />
                        </div>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default Input;
