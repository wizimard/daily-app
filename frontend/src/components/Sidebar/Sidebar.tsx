import React, { useContext, useState } from "react";

import { Settings } from "..";

import { ThemeContext } from "../../themes/Themes";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { userSignOut } from "../../redux/action-creator/UserActionCreator";

import Menu from "./Menu";

import './Sidebar.scss';

const Sidebar: React.FC = () => {

    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.auth.user);

    const { theme } = useContext(ThemeContext);

    const [isShowSettings, setIsShowSettings] = useState(false);

    const handlerChangeShowSettings = () => {
        setIsShowSettings(prev => !prev);
    }
    
    const handlerLogout = () => {
        dispatch(userSignOut());
    }

    return (
        <>
        {isShowSettings && <Settings handlerOnClose={handlerChangeShowSettings} />}
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="img-container sidebar__avatar">
                    {user.avatar ? (
                        <img src={user.avatar} alt="avatar" />
                    ) : (
                        <img src={theme.img.avatar} alt="avatar" />
                    )}
                </div>
            </div>
            <Menu />
            <div className="sidebar__footer">
                <div className="sidebar__settings" 
                     onClick={handlerChangeShowSettings}>
                    <div className="img-container">
                        <img src={theme.img.settings} alt="settings" />
                    </div>
                    <span>Settings</span>
                </div>
                <div className="img-container img-click sidebar__logout">
                    <img src={theme.img.logout}
                        onClick={handlerLogout} 
                        alt="logout" />
                </div>
            </div>
        </div>
        </>
    );
}

export default Sidebar;