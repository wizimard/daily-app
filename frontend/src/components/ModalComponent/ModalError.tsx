import React, { useContext } from "react";

import { ThemeContext } from "../../themes/Themes";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { systemHideModal } from "../../redux/reducers/SystemSlice";

const ModalError:React.FC = () => {

    const dispatch = useAppDispatch();

    const { modal } = useAppSelector(state => state.system);

    const { theme } = useContext(ThemeContext);

    const handlerCloseModal = () => {
        dispatch(systemHideModal());
    }

    return (
        <div className="modal-error">
            <div className="modal__title modal-error__title">
                <img src={theme.img.error} alt="error" />Error!
            </div>
            <p className="modal__content modal-error__content">{modal.props.message}</p>
            <button className="modal__btn modal-error__btn"
                onClick={handlerCloseModal}>Close</button>
        </div>
    );
};

export default ModalError;