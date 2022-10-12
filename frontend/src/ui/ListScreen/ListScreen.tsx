import React from "react";

interface ListScreenProps {
    onScrollHandle?: (e: React.UIEvent<HTMLDivElement>) => void;
}

const ListScreen:React.FC<ListScreenProps> = ({ onScrollHandle, children }) => {
    return (
        <div className="list-screen" onScroll={onScrollHandle}>
            {children}
        </div>
    );
}

export default ListScreen;