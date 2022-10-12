import React from 'react';

const AuthElement = React.lazy(() => import('../pages/Auth'));
const DiaryElement = React.lazy(() => import('../pages/Diary'));
const TaskElement = React.lazy(() => import('../pages/Task'));
const Page404Element = React.lazy(() => import('../pages/404'));

export const routes = {
    "public": [
        {
            "path": "/auth",
            "element": AuthElement
        },
        {
            "path": "/404",
            "element": Page404Element
        }
    ],
    "private": [
        {
            "path": "/diary",
            "element": DiaryElement
        },
        {
            "path": "/diary/:id",
            "element": DiaryElement
        },
        {
            "path": "/task",
            "element": TaskElement
        },
        {
            "path": "/task/:id",
            "element": TaskElement
        },
        {
            "path": "/404",
            "element": Page404Element
        }
    ],
    "redirect": {
        "public": "/auth",
        "private": "/task"
    }
}