import { DateTime } from 'luxon';

export const htmlDateString = (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(
        format || 'yyyy-LL-dd',
    );
};

export const readableDate = (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || 'utc' }).toFormat(
        format || 'd LLLL, yyyy',
    );
};
