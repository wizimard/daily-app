import React from "react";

const ListScreen: React.FC = ({ children }) => {
    return (
        <div className="list-screen">
            {children}
        </div>
    );
}

export default ListScreen;