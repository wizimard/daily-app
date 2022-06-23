import { Diary } from "../pages"
import Auth from "../pages/Auth"

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
        }
    ]
}