import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file\
import { Calendar } from 'react-date-range';
import { addDays } from 'date-fns';
import { useState } from 'react';


export function DatePicker({handlePickingDates,preventPropagation}) {


    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    console.log('state:',state);



    return (
        <div onClick={preventPropagation}>
        <DateRange
            editableDateInputs={true}
            onChange={item => setState([item.selection],handlePickingDates(state[0].startDate,state[0].endDate))}
            moveRangeOnFirstSelection={false}
            ranges={state}
        />
        </div>
    )
}