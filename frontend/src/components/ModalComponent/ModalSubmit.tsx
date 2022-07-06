import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { systemHideModal } from "../../redux/reducers/SystemSlice";

import Spinner from "../Spinner";

import { functionsSubmitted } from "./functionsSubmitted";

const ModalSubmit:React.FC = () => {

    const dispatch = useAppDispatch();

    const modal = useAppSelector(state => state.system.modal);

    const [isSubmit, setIsSubmit] = useState(false);

    const handlerSubmitModal = () => {
        setIsSubmit(true);
        if ('type' in modal.props && 'id' in modal.props) {

            const func = functionsSubmitted[modal.props.type];
            dispatch(func(modal.props.id)).then(() => {
                dispatch(systemHideModal());
            });

        }
    }
    const handlerHideModal = () => {
        dispatch(systemHideModal());
    }

    return (
        <>
        <div className="modal-submit" style={isSubmit ? {display: 'none'} : undefined}>
            <div className="modal__title modal-submit__title">Submit</div>
            <p className="modal__content">{modal.props.message}</p>
            <div className="modal__btn--group">
                <button className="modal__btn"
                    onClick={handlerSubmitModal}>Yes</button>
                <button className="modal__btn"
                    onClick={handlerHideModal}>Cancel</button>
            </div>
        </div>
        {isSubmit && (
            <Spinner text="Wait..." />
        )}
        </>
    );
};

export default ModalSubmit;