import React from "react";

import { useAppSelector } from "../../hooks/redux";
import { systemConstants } from "../../redux/constants/systemConstants";

import ModalError from "./ModalError";
import ModalSubmit from "./ModalSubmit";

import "./ModalComponent.scss";

const ModalComponent:React.FC = () => {

    const { modal } = useAppSelector(state => state.system);

    return (
        <div className="modal">
            {modal.type === systemConstants.SYSTEM_MODAL_ERROR && (
                <ModalError />
            )}
            {modal.type === systemConstants.SYSTEM_MODAL_SUBMIT && (
                <ModalSubmit />
            )}
        </div>
    );
};

export default ModalComponent;