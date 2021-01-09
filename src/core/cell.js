import Storage from './storage';

export default class Cell extends Storage {

    constructor(address,value,size) {
        super(address,value,size);
    }

    static cells=[];

    static findCellsByAddress(address) {
        return Cell.cells.find(element => element.address === address);
    }
}