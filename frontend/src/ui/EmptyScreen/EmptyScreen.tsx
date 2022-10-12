import React from "react";

import './EmptyScreen.scss';

const EmptyScreen:React.FC = () => {
    return(
        <div className="empty-screen-container">
            <div className="empty-screen">
                <div className="circle">
                </div>
                <div className="triangle">
                    <div className="line line_1">
                        <div className="line_1--container"></div>
                    </div>
                    <div className="line line_2"></div>
                    <div className="line line_3"></div>
                </div>
            </div>
            <div className="empty-screen__text">Here is empty</div>
        </div>
    );
};

export default EmptyScreen;