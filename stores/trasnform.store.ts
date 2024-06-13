export const trasnformStore = defineStore('trasnformStore', () => {

    const ToArrayString = (array: Array<any>, key: string): Array<string> =>{
        let transfomed: string[] = [];
        array.forEach(element => {
            if(element){
                transfomed.push(element[key]);
            }
        });
        return transfomed;
    }
    const ToArrayObject = (array: Array<any>, key: string, value: string ): Array<any> =>{
        let transfomed: any[] = [];
        array.forEach(element => {
            if(element){
                transfomed.push(
                    {
                        [key] : element[value]
                    }
                );
            }
        });
        return transfomed;
    }
   
    return {
        ToArrayString,
        ToArrayObject
}})