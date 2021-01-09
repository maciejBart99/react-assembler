export default class Storage {

    constructor(address,value,size) {
        this.address=address;
        this.value=value;
        this.size=size;
    }

    getDec() {
        return this.value.toString(10);
    }

    getBin() {
        return this.value.toString(2);
    }

    getHex() {
        return this.value.toString(16);
    }
}