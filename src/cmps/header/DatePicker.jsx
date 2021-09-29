import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file\
import { Calendar } from 'react-date-range';
import { addDays } from 'date-fns';


export const DatePicker = ({ handlePickingDates, preventPropagation }) => {

    const [dateState, setDateState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    useEffect(() => {
        handlePickingDates(dateState[0].startDate, dateState[0].endDate)
    }, [dateState])

    return (
        <div onClick={preventPropagation}>
            <DateRange
                editableDateInputs={true}
                onChange={item => setDateState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateState}
            />
        </div>
    )
}