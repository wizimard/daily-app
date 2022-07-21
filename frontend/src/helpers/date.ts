import { months } from "../constants/months";


export function formatDate(dateStr: string = (new Date()).toString()): string {

    const date = new Date(dateStr);

    const formatDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    return formatDate;
}