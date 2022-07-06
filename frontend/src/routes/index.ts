import { Diary, Auth, Task } from "../pages";

export const routes = {
    "public": [
        {
            "path": "/auth",
            "element": Auth
        }
    ],
    "private": [
        {
            "path": "/diary",
            "element": Diary
        },
        {
            "path": "/diary/:id",
            "element": Diary
        },
        {
            "path": "/task",
            "element": Task
        },
        {
            "path": "/task/:id",
            "element": Task
        }
    ],
    "redirect": {
        "public": "/auth",
        "private": "/task"
    }
}