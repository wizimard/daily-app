import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ThemeContext } from "../../themes/Themes";

const Menu:React.FC = () => {

    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const { theme } = useContext(ThemeContext);

    const [activePage, setActivePage] = useState("");

    const handlerOnClickDiary = () => {
        navigate("/diary");
    }
    const handlerOnClickTask = () => {
        navigate("/task");
    }

    useEffect(() => {

        if (pathname.search("task") === 1) setActivePage("task");

        if (pathname.search("diary") === 1) setActivePage("diary");

    }, [pathname]);
    
    return(
        <nav className="menu">
            <ul>
                <li className={`menu__item ${activePage === "diary" ? 'menu__item_active' : ''}`}
                    onClick={handlerOnClickDiary}>
                    <div className="img-container menu__item--img">
                        <img src={theme.img.diary} alt="diary" />
                    </div>
                    <span className="menu__item--text">Diary</span>
                </li>
                <li className={`menu__item ${activePage === "task" ? 'menu__item_active' : ''}`}
                    onClick={handlerOnClickTask}>
                    <div className="img-container menu__item--img">
                        <img src={theme.img.task} alt="task" />
                    </div>
                    <span className="menu__item--text">Tasks</span>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;