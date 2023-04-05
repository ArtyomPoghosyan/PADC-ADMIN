import moment from 'moment';
import 'moment-timezone';


export const dateFormater:React.FC<string> = (date:string):string | any  => {
    const dayHourFormat: string = 'YYYY-MM-DD HH:mm';
    return (moment(date).format(dayHourFormat))
}