import React from "react";

import './ContentScreen.scss';

const ContentScreen: React.FC = ({ children }) => {
    return (
        <div className="content-screen">
            {children}
        </div>
    );
}

export default ContentScreen;