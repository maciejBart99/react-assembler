import Storage from './storage';

export default class Register extends Storage {

    constructor(address,value,size) {
        super(address,value,size);
    }

    static registers=[];

    static findRegisterByAddress(address) {

        let result=null;

        Register.registers.forEach(element => {
            if(element.address==address)
                result=element;
        });

        return result;
    }
}