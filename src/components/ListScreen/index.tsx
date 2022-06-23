import React from "react";

import './ListScreen.scss';

const ListScreen: React.FC = ({ children }) => {
    return (
        <div className="list-screen">
            {children}
        </div>
    );
}

export default ListScreen;