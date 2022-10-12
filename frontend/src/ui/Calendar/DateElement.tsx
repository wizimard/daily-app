import React, { useEffect, useState } from "react";

interface DateElementProps {
    date: Date;
    selectedDate: Date;
    handlerSelectDate: (date: Date) => void;
}

const DateElement:React.FC<DateElementProps> = ({date, selectedDate, handlerSelectDate}) => {

    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isToday, setIsToday] = useState<boolean>(false);

    const handlerOnClickDate = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        handlerSelectDate(date);
    }

    useEffect(() => {

        const today = new Date();

        setIsToday(date.getDate() === today.getDate() && 
            date.getMonth() === today.getMonth() && 
            date.getFullYear() === today.getFullYear());

    }, [date]);

    useEffect(() => {

        setIsSelected(date.getDate() === selectedDate.getDate() && 
            date.getMonth() === selectedDate.getMonth() && 
            date.getFullYear() === selectedDate.getFullYear());

    }, [date, selectedDate]);

    return(
        <div className={`calendar__date ${
                (isSelected) ? 'calendar__date_active' : ''
            } ${
                (isToday) ? ' calendar__date_today' : ''
            }`}
            onClick={handlerOnClickDate}>
            {date.getDate()}
        </div>
    );
};

export default DateElement;