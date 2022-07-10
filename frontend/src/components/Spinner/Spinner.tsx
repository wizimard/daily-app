import React from "react";

import "./Spinner.scss";

interface SpinnerProps {
    text?: string;
}

const Spinner:React.FC<SpinnerProps> = ({text = "Loading"}) => {
    return (
        <div className="spinner">
            {text}
            <span></span>
        </div>
    );
}

export default Spinner;