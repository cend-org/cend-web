export const trasnformStore = defineStore('trasnformStore', () => {

    const ToArrayString = (array: Array<any>, key: string): Array<string> => {
        let transfomed: string[] = [];
        array.forEach(element => {
            if (element) {
                transfomed.push(element[key]);
            }
        });
        return transfomed;
    }
    
    const ToArrayObject = (array: Array<any>, key: string, value: string): Array<any> => {
        let transfomed: any[] = [];
        array.forEach(element => {
            if (element) {
                transfomed.push(
                    {
                        [key]: element[value]
                    }
                );
            }
        });
        return transfomed;
    }

    const HoursToCurrentDate = (hours: string, datetime: any): Date => {
        let dateHour = hours.split(':') as Array<string>;
        let hour = parseInt(dateHour[0]);
        let minute = parseInt(dateHour[1]);
        let date = new Date(datetime);

        date.setHours(hour);
        date.setMinutes(minute);
        date.setUTCSeconds(0);
        date.setUTCMilliseconds(0);
        return date;
    };

    const  normalizeString = (str: string): string => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    return {
        ToArrayString,
        ToArrayObject,
        HoursToCurrentDate, 
        normalizeString
    }
});