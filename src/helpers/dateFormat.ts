import moment from 'moment';
import 'moment-timezone';

export const dateFormat = (date: string): string => {
    const dayHourFormat: string = 'YYYY-MM-DD HH:mm';
    return (moment(date).format(dayHourFormat))
}