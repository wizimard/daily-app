import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DiaryIconSvg from "../../assets/img/diary-icon.svg";
import TaskIconSvg from "../../assets/img/task-icon.svg";

const Menu:React.FC = () => {

    const pathname = useLocation().pathname;
    const navigate = useNavigate();

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
        <div className="menu">
            <div className={`menu__item ${activePage === "diary" ? 'menu__item_active' : ''}`}
                onClick={handlerOnClickDiary}>
                <div className="img-container menu__item--img">
                    <img src={DiaryIconSvg} alt="diary" />
                </div>
                <span className="menu__item--text">Diary</span>
            </div>
            <div className={`menu__item ${activePage === "task" ? 'menu__item_active' : ''}`}
                onClick={handlerOnClickTask}>
                <div className="img-container menu__item--img">
                    <img src={TaskIconSvg} alt="task" />
                </div>
                <span className="menu__item--text">Tasks</span>
            </div>
        </div>
    );
}

export default Menu;