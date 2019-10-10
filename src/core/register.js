import Storage from './storage';

export default class Register extends Storage {

    constructor(adress,value,size) {
        super(adress,value,size);
    }

    static registers=[];

    static findRegisterByAdress(adress) {

        let result=null;

        Register.registers.forEach(element => {
            if(element.adress==adress)
                result=element;
        });

        return result;
    }
}