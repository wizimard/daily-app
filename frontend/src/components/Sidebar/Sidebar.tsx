import React from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { userClear } from "../../redux/reducers/UserSlice";

import Menu from "./Menu";

import AvatarPng from "../../assets/img/avatar.png";
import LogoutSvg from "../../assets/img/logout.svg";

import './Sidebar.scss';

const Sidebar: React.FC = () => {

    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.user);
    
    const handlerLogout = () => {
        dispatch(userClear());
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="img-container sidebar__avatar">
                    {user.avatar ? (
                        <img src={user.avatar} alt="avatar" />
                    ) : (
                        <img src={AvatarPng} alt="avatar" />
                    )}
                </div>
            </div>
            <Menu />
            <div className="sidebar__footer">
                <div className="img-container img-click sidebar__logout"
                    onClick={handlerLogout}>
                    <img src={LogoutSvg} alt="logout" />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;