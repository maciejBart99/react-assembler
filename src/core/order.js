export default class Order {
    constructor(command,tag,...args) {
        this.command=command;
        this.args=args;
        this.tag=tag;
    }
}