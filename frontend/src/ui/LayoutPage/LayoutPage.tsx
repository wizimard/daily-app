import React from "react";
import { Sidebar } from "../../components";

const LayoutPage:React.FC = ({ children }) => {
    return (
        <>
        <Sidebar />
        { children }
        </>
    );
};

export default LayoutPage;