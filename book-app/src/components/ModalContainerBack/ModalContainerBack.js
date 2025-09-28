import React from "react";
import "./ModalContainerBack.scss";

import { Modal } from "@mui/material";


export default function ModalContainerBack(props){

    const { isOpenModal, closeModal, children} = props;

    return (
        <Modal className="modal-container" 
        open = {isOpenModal} 
        onClose={closeModal} 
        closeAfterTransition
        >

            <div>
                {children}
            </div>

        </Modal>

    );
    
}   