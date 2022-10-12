import { createContext, useEffect, useState } from 'react';

import AddBlackSvg from '../assets/img/add_black.svg';
import AddWhiteSvg from '../assets/img/add_white.svg';
import CloseBlackSvg from '../assets/img/close_black.svg';
import CloseWhiteSvg from '../assets/img/close_white.svg';
// import LockBlack1xPng from '../assets/img/lock-black1x.png';
// import LockBlack2xPng from '../assets/img/lock-black2x.png';
import LockWhiteSvg from '../assets/img/lock_white.svg';
// import MailBlack1xPng from '../assets/img/mail-black1x.png';
// import MailBlack2xPng from '../assets/img/mail-black2x.png';
import MailWhiteSvg from '../assets/img/email_white.svg';
import DiaryIconBlackSvg from '../assets/img/diary-icon-black.svg';
import DiaryIconWhiteSvg from '../assets/img/diary-icon-white.svg';
import LogoutBlackSvg from '../assets/img/logout-black.svg';
import LogoutWhiteSvg from '../assets/img/logout-white.svg';
import TaskIconBlackSvg from '../assets/img/task-icon-black.svg';
import TaskIconWhiteSvg from '../assets/img/task-icon-white.svg';
import ThemeBlackSvg from '../assets/img/theme_mode-black.svg';
import ThemeWhiteSvg from '../assets/img/theme_mode-white.svg';
import CriticalPng from '../assets/img/critical.png';
import DangerousPng from '../assets/img/dangerous.png';
import DoneSvg from '../assets/img/done.svg';
import ErrorSvg from '../assets/img/error.svg';
import ArrowBackBlackSvg from '../assets/img/arrow-back-black.svg';
import ArrowBackWhiteSvg from '../assets/img/arrow-back-white.svg';
import SettingsBlackSvg from '../assets/img/settings_black.svg';
import SettingWhiteSvg from '../assets/img/settings_white.svg';
import AddImageWhiteSvg from '../assets/img/add_image_white.svg';

export const themes = {
    light: {
        img: {
            close: CloseBlackSvg,
            add: AddBlackSvg,
            lock: LockWhiteSvg,
            mail: MailWhiteSvg,
            diary: DiaryIconBlackSvg,
            task: TaskIconBlackSvg,
            logout: LogoutBlackSvg,
            theme: ThemeBlackSvg,
            avatar: 'http://localhost:3010/default/avatar.png',
            critical: CriticalPng,
            dangerous: DangerousPng,
            done: DoneSvg,
            error: ErrorSvg,
            back: ArrowBackBlackSvg,
            diaryDefault: 'http://localhost:3010/default/diary-default.png',
            settings: SettingsBlackSvg,
            addImage: AddImageWhiteSvg
        },
        color: {
            color: '#303A3D',
            background: '#fff',
            modalBg: 'rgba(255, 255, 255, 0.8)'
        }
    },
    dark: {
        img: {
            close: CloseWhiteSvg,
            add: AddWhiteSvg,
            lock: LockWhiteSvg,
            mail: MailWhiteSvg,
            diary: DiaryIconWhiteSvg,
            task: TaskIconWhiteSvg,
            logout: LogoutWhiteSvg,
            theme: ThemeWhiteSvg,
            avatar: 'http://localhost:3010/default/avatar.png',
            critical: CriticalPng,
            dangerous: DangerousPng,
            done: DoneSvg,
            error: ErrorSvg,
            back: ArrowBackWhiteSvg,
            diaryDefault: 'http://localhost:3010/default/diary-default.png',
            settings: SettingWhiteSvg,
            addImage: AddImageWhiteSvg
        },
        color: {
            color: '#fff',
            background: '#303A3D',
            modalBg: 'rgba(48, 58, 61, 0.5)'
        }
    }
}

export const ThemeContext = createContext({
    theme: themes.light,
    switchTheme: () => {}
});

export function getThemeMode() {
    if (localStorage.getItem('theme') === 'theme_dark') return themes.dark;

    return themes.light;    
}

export const ThemeContextProvider:React.FC = ({ children }) => {

    const switchTheme = () => {        
        setTheme(prev => {
            if (prev.theme === themes.light) {
                document.getElementsByClassName('App')[0].className = 'App theme_dark'
                    
                localStorage.setItem('theme', 'theme_dark');
            } else {
                document.getElementsByClassName('App')[0].className = 'App theme_light'

                    localStorage.setItem('theme', 'theme_light');
            }

            return {
                theme: prev.theme === themes.light ? themes.dark : themes.light,
                switchTheme
            }
        });
    }

    const [theme, setTheme] = useState({
        theme: getThemeMode(),
        switchTheme
    });

    useEffect(() => {
        if (theme.theme === themes.dark) {
                document.getElementsByClassName('App')[0].className = 'App theme_dark'
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};