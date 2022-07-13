import { months } from "../constants/months";


export function formatDate(strDate: string = (new Date()).toString()): string {

    const date = new Date(strDate);    

    const currentDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    return currentDate;
}