import React from "react";

import Spinner from "../Spinner";
import ModalComponent from "../ModalComponent";

import { useAppSelector } from "../../hooks/redux";

import "./SystemComponent.scss";

const SystemComponent:React.FC = () => {

    const system = useAppSelector(state => state.system);

    return (
        <>{(system.status === "loading" || system.modal.isShow) && (
            <div className="system-component">
                {(system.modal.isShow) ? (
                    <ModalComponent />
                ) : (
                    <Spinner />
                )}
            </div>
        )}
        </>
    )
};

export default SystemComponent;