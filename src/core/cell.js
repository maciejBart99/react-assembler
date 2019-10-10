import Storage from './storage';

export default class Cell extends Storage {

    constructor(adress,value,size) {
        super(adress,value,size);
    }

    static cells=[];

    static findCellsByAdress(adress) {

        let result=null;

        Cell.cells.forEach(element => {
            if(element.adress==adress)
                result=element;
        });

        return result;
    }
}