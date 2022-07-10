import React, { useCallback, useEffect, useState } from 'react';

import { Portal } from '..';

import { months } from '../../utils/date';

import DateElement from './DateElement';

import "./Calendar.scss";

interface CalendarProps {
    selectedDate: Date;
    handlerSelectDate: (date: Date) => void;
}

const Calendar:React.FC<CalendarProps> = ({ selectedDate, handlerSelectDate }) => {

    const [currentValue, setCurrectValue] = useState(new Date(selectedDate.toString()));
    const [monthDates, setMonthDates] = useState<Date[]>([]);

    const printMonth = () => {
        return `${months[currentValue.getMonth()]} ${currentValue.getFullYear()}`;
    }

    const handlerPrevMonth = () => {
        const newDate = new Date(currentValue.toString());

        newDate.setMonth(newDate.getMonth() - 1);

        setCurrectValue(newDate);
    };
    const handlerNextMonth = () => {
        const newDate = new Date(currentValue.toString());

        newDate.setMonth(newDate.getMonth() + 1);

        setCurrectValue(newDate);
    };
    useEffect(() => {
        const result = [];

        const tempDate = new Date(currentValue.toString());
        tempDate.setDate(1);

        while (tempDate.getMonth() <= currentValue.getMonth() && 
        tempDate.getFullYear() <= currentValue.getFullYear()) {
            result.push(new Date(tempDate.toString()));

            tempDate.setDate(tempDate.getDate() + 1);
        }

        tempDate.setDate(1);
        tempDate.setFullYear(currentValue.getFullYear());
        tempDate.setMonth(currentValue.getMonth());

        while (tempDate.getDay() !== 1) {
            tempDate.setDate(tempDate.getDate() - 1);
            
            result.unshift(new Date(tempDate.toString()));
        }

        tempDate.setDate(1);

        tempDate.setFullYear(currentValue.getFullYear());
        tempDate.setMonth(currentValue.getMonth());
        tempDate.setDate(result[result.length - 1].getDate());
        
        while (tempDate.getDay() !== 0) {
            tempDate.setDate(tempDate.getDate() + 1);

            result.push(new Date(tempDate.toString()));
        }

        setMonthDates(result);

    }, [currentValue]);

    const handlerKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            handlerSelectDate(selectedDate);
        }
    }, [selectedDate, handlerSelectDate]);
    

    useEffect(() => {

        document.body.addEventListener("keydown", handlerKeyDown);

        return () => {
            document.body.removeEventListener("keydown", handlerKeyDown);
        };

    }, [handlerKeyDown]);

    return (
        <Portal>
            <div className="calendar-container">
                <div className="calendar">
                    <div className="calendar__month">
                        <div className="calendar__month--arrow calendar__month--prev"
                            onClick={handlerPrevMonth}></div>
                        <h2 className="calendar__month--value">{printMonth()}</h2>
                        <div className="calendar__month--arrow calendar__month--next"
                            onClick={handlerNextMonth}></div>
                    </div>
                    <div className="calendar__days">
                        <span className="calendar__day">Mon</span>
                        <span className="calendar__day">Tue</span>
                        <span className="calendar__day">Wed</span>
                        <span className="calendar__day">Thu</span>
                        <span className="calendar__day">Fri</span>
                        <span className="calendar__day">Sat</span>
                        <span className="calendar__day">Sun</span>
                    </div>
                    <div className="calendar__dates">
                        {monthDates.map((date, index) => (
                            <div key={index} className="calendar__date--container">
                                <DateElement date={date}
                                    selectedDate={selectedDate}
                                    handlerSelectDate={handlerSelectDate} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Portal>
    );
}

export default Calendar;