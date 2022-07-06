import React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { systemHideModal } from "../../redux/reducers/SystemSlice";

import ErrorSvg from "../../assets/img/error.svg";

const ModalError:React.FC = () => {

    const dispatch = useAppDispatch();

    const { modal } = useAppSelector(state => state.system);

    const handlerCloseModal = () => {
        dispatch(systemHideModal());
    }

    return (
        <div className="modal-error">
            <div className="modal__title modal-error__title">
                <img src={ErrorSvg} alt="error" />Error!
            </div>
            <p className="modal__content modal-error__content">{modal.props.message}</p>
            <button className="modal__btn modal-error__btn"
                onClick={handlerCloseModal}>Close</button>
        </div>
    );
};

export default ModalError;