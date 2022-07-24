import React, { useContext } from 'react';
import { useAppSelector } from '../../hooks/redux';

import { ThemeContext } from '../../themes/Themes';

import { Button, Input, ModalComponent } from '../../ui';

import './Settings.scss';

interface SettingsProps {
    handlerOnClose: () => void;
}

const Settings:React.FC<SettingsProps> = ({ handlerOnClose }) => {

    const { theme, switchTheme } = useContext(ThemeContext);

    const user = useAppSelector(state => state.auth.user);
    
    const handlerSwitchTheme = () => {
        switchTheme();
    }

    return (
        <ModalComponent closeModalHandle={handlerOnClose}>
            <div className="settings" style={
                { backgroundColor: `${theme.color.modalBg}`, color: `${theme.color.color}`}
                }>
                <div className="settings__left">
                    <div className="settings__header">
                        <h3>Settings</h3>
                        <div className="img-container img-click settings__theme">
                            <img src={theme.img.theme} 
                                onClick={handlerSwitchTheme} 
                                alt="theme" />
                        </div>
                    </div>
                    <div className="settings__input">
                        <label htmlFor="email">Email ({user.isConfirm ? 'confirmed' : 'not confirmed'})</label>
                        <Input id='email' 
                               type="email"
                               initialValue={user.email}
                               placeholder="email"
                               onSave={(value: string) => {console.log(value)}}/>
                    </div>
                    <div className="settings__input">
                        <label htmlFor="username">Username</label>
                        <Input id='username' 
                               type="text"
                               initialValue={user.username}
                               placeholder="username"
                               onSave={(value: string) => {console.log(value)}}/>
                    </div>
                    <div className="settings_btn">
                        <Button text='save'
                                onClick={() => {}} />
                    </div>
                </div>
                <div className="settings__right">
                    <div className="settings__avatar--container">
                        <div className="img-container settings__avatar">
                            <img src={user.avatar || theme.img.avatar} alt="avatar" />
                        </div>
                        <div className="settings__avatar--change">
                            <div className="img-container">
                                <img src={theme.img.addImage} alt="add" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}

export default Settings;