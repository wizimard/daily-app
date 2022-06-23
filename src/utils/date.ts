const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export function formatDate(strDate: string = (new Date()).toString()): string {

    const date = new Date(strDate);

    const currentDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    return currentDate;    
}