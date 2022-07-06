import React from "react";
import { useNavigate } from "react-router-dom";

import './ListItem.scss';

interface ListItemProps {
    link: string;
    addClass?: string;
}

const ListItem: React.FC<ListItemProps> = ({ link, addClass, children }) => {

    const navigate = useNavigate();

    const handleOnClickItem = () => {
        navigate(`${link}`);
    }

    return (
        <div className={`list-item ${addClass}`} onClick={handleOnClickItem}>
            {children}
        </div>
    );
}

export default ListItem;