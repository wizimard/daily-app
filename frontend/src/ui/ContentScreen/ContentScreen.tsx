import React from "react";


interface ContentScreenProps {
    isDisplayNone?: boolean;
}

const ContentScreen:React.FC<ContentScreenProps> = ({ isDisplayNone = false, children }) => {
    return (
        <div className={`content-screen ${isDisplayNone ? 'dsp-none' : ''}`}>
            {children}
        </div>
    );
}

export default ContentScreen;