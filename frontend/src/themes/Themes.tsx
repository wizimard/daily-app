import { createContext, useEffect, useState } from 'react';

import AddBlack1xPng from '../assets/img/add-black1x.png';
import AddBlack2xPng from '../assets/img/add-black2x.png';
import AddWhite1xPng from '../assets/img/add-white1x.png';
import AddWhite2xPng from '../assets/img/add-white2x.png';
import CloseBlack1xPng from '../assets/img/close-black1x.png';
import CloseBlack2xPng from '../assets/img/close-black2x.png';
import CloseWhite1xPng from '../assets/img/close-white1x.png';
import CloseWhite2xPng from '../assets/img/close-white2x.png';
// import LockBlack1xPng from '../assets/img/lock-black1x.png';
// import LockBlack2xPng from '../assets/img/lock-black2x.png';
import LockWhite1xPng from '../assets/img/lock-white1x.png';
import LockWhite2xPng from '../assets/img/lock-white2x.png';
// import MailBlack1xPng from '../assets/img/mail-black1x.png';
// import MailBlack2xPng from '../assets/img/mail-black2x.png';
import MailWhite1xPng from '../assets/img/mail-white1x.png';
import MailWhite2xPng from '../assets/img/mail-white2x.png';
import DiaryIconBlackSvg from '../assets/img/diary-icon-black.svg';
import DiaryIconWhiteSvg from '../assets/img/diary-icon-white.svg';
import LogoutBlackSvg from '../assets/img/logout-black.svg';
import LogoutWhiteSvg from '../assets/img/logout-white.svg';
import TaskIconBlackSvg from '../assets/img/task-icon-black.svg';
import TaskIconWhiteSvg from '../assets/img/task-icon-white.svg';
import ThemeBlackSvg from '../assets/img/theme_mode-black.svg';
import ThemeWhiteSvg from '../assets/img/theme_mode-white.svg';
import AvatarPng from '../assets/img/avatar.png';
import CriticalPng from '../assets/img/critical.png';
import DangerousPng from '../assets/img/dangerous.png';
import DoneSvg from '../assets/img/done.svg';
import ErrorSvg from '../assets/img/error.svg';
import ArrowBackBlackSvg from '../assets/img/arrow-back-black.svg';
import ArrowBackWhiteSvg from '../assets/img/arrow-back-white.svg';
import DiaryDefaultPng from '../assets/img/diary-default.png';

export const themes = {
    light: {
        img: {
            close: {
                x1: CloseBlack1xPng,
                x2: CloseBlack2xPng
            },
            add: {
                x1: AddBlack1xPng,
                x2: AddBlack2xPng
            },
            lock: {
                x1: LockWhite1xPng,
                x2: LockWhite2xPng
            },
            mail: {
                x1: MailWhite1xPng,
                x2: MailWhite2xPng
            },
            diary: DiaryIconBlackSvg,
            task: TaskIconBlackSvg,
            logout: LogoutBlackSvg,
            theme: ThemeBlackSvg,
            avatar: AvatarPng,
            critical: CriticalPng,
            dangerous: DangerousPng,
            done: DoneSvg,
            error: ErrorSvg,
            back: ArrowBackBlackSvg,
            diaryDefault: DiaryDefaultPng
        }
    },
    dark: {
        img: {
            close: {
                x1: CloseWhite1xPng,
                x2: CloseWhite2xPng
            },
            add: {
                x1: AddWhite1xPng,
                x2: AddWhite2xPng
            },
            lock: {
                x1: LockWhite1xPng,
                x2: LockWhite2xPng
            },
            mail: {
                x1: MailWhite1xPng,
                x2: MailWhite2xPng
            },
            diary: DiaryIconWhiteSvg,
            task: TaskIconWhiteSvg,
            logout: LogoutWhiteSvg,
            theme: ThemeWhiteSvg,
            avatar: AvatarPng,
            critical: CriticalPng,
            dangerous: DangerousPng,
            done: DoneSvg,
            error: ErrorSvg,
            back: ArrowBackWhiteSvg,
            diaryDefault: DiaryDefaultPng
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