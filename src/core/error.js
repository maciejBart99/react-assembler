export default class Error {
    constructor(type,msg,line) {
        this.type=type;
        this.msg=msg;
        this.line=line;
    }
}