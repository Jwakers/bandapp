import React from 'react'

export const objectsToArray = (object, setID = false) => {
    const transformedObject = Object.entries(object).map((obj) => {
        const newObj = { ...obj[1] };
        if (setID) newObj.id = obj[0];
        return newObj;
    });
    return transformedObject;
};

export const formatDate = (date, includePreText = true) => {
    const diff = new Date(date) - new Date();
    // To days calculation, rounded up
    const dayDiff = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const classes = ['date']
    let preText = "Overdue:";
    let dateString = new Date(date).toLocaleDateString();
    let modifier = 'date--overdue';

    if (dayDiff >= 0) {
        preText = "Due:";
        if (dayDiff < 5) {
            dateString = `${dayDiff} days`;
            modifier = 'date--warn'
            if (dayDiff < 2) modifier = 'date--urgent';
            if (dayDiff === 0) dateString = `Today`;
            if (dayDiff === 1) dateString = `Tomorrow`;
        } else modifier = null;
    }
    modifier && classes.push(modifier)
    return (
        <div className={classes.join(' ')}>
            {includePreText && <span className="date__text">{preText}</span>}
            <span className="date__date">{dateString}</span>
        </div>
    );
};
