// React Modal is a third party API that creates good looking modals

import React from 'react';
// import instructions on react-modal website
import Modal from 'react-modal';

// requirements of use on react-modal website
const OptionModal = (props) => (
    <Modal
    // using !! to get true/false value
        isOpen={!!props.selectedOption}
        onRequestClose={props.handleClearSelectedOption}
        contentLabel={"Selected Option"}
        closeTimeoutMS={200}
        className="modal"
    >
    <h3 className="modal__title">Selected Option</h3>
    {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
    <button className="button" onClick = {props.handleClearSelectedOption}>Okay</button>
    </Modal>
)

export default OptionModal