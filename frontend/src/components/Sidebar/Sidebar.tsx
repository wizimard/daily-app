import React, { useContext } from "react";

import { ThemeContext } from "../../themes/Themes";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { userSignOut } from "../../redux/action-creator/UserActionCreator";

import Menu from "./Menu";

import './Sidebar.scss';

const Sidebar: React.FC = () => {

    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.auth.user);

    const { theme, switchTheme } = useContext(ThemeContext);
    
    const handlerLogout = () => {
        dispatch(userSignOut());
    }
    const handlerSwitchTheme = () => {
        switchTheme();
    }

    return (
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
                <div className="img-container img-click sidebar__theme">
                    <img src={theme.img.theme} 
                        onClick={handlerSwitchTheme} 
                        alt="theme" />
                </div>
                <div className="img-container img-click sidebar__logout">
                    <img src={theme.img.logout}
                        onClick={handlerLogout} 
                        alt="logout" />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;