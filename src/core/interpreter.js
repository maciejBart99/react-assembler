import Register from './register';
import Cell from './cell';
import Error from './error';
import Order from './order';

export default class Interpreter {

    constructor(errorHandler) {
        this.errorHandler=errorHandler;
        this.stateRegister=new Register('STATE',0,2);
    } 

    ordersList=[];

    clearConfiguration() {
        this.ordersList=[];
        Register.registers=[];
        for(let i=0;i<16;i++) {
            let tmp=new Register(i,0,32);
            Register.registers.push(tmp);
        }
        Cell.cells=[];
    }

    loadScript(script) {
        this.clearConfiguration();
        try {
            script.split('\n').map(el=>el.trim()).forEach((element,index) => {

                if(element!='')
                {
                    let line=element.split(' ').map(el=>el.trim()).filter(el=>el!='');
                    
                    let order;

                    if(line.length==3) {
                        order=new Order(line[1],line[0],...line[2].split(',').map(el=>el.trim()).filter(el=>el!=''));
                    }
                    else if(line.length==2) {
                        order=new Order(line[0],'',...line[1].split(',').map(el=>el.trim()).filter(el=>el!=''));
                    }
                    else if(line.length==1) {
                        order=new Order('',line[0]);
                    }
                    else {
                        this.errorHandler(new Error('Błąd składni','Polecenie zawiera zbyt dużo znaków spacji.',index));
                        return;
                    }

                    this.ordersList.push(order);
                }
            });
        } catch(ex) {
            this.errorHandler(new Error('Błąd składni','Wystąpił nieznany błąd.',0));
            return;
        }
    }

    executeLine(order,line) {
        switch(order.command) {

            //Operacje rezerwacji
            case 'DC':
                    {
                    let a=order.args[0].trim().slice(0,-1).split('(').map(el=>el.trim());
                    if(a.length==2)
                    {
                        let val=a[1];
                        val=Number(val);
    
                        if(isNaN(val))
                        {
                            this.errorHandler(new Error('Błąd wykonawczy','Wartość musi być liczbą.',line));
                            return; 
                        }
                        else {
                            let obj=new Cell(order.tag,val,32);
                            Cell.cells.push(obj);
                        }
                    }
                    else {
                        this.errorHandler(new Error('Błąd wykonawczy','Niepoprawna składnia polecania DC.',line));
                        return; 
                    }
                }
                break;
            case 'DS':
                {
                let a=order.args[0].trim();
                
                let obj=new Cell(order.tag,0,32);
                Cell.cells.push(obj);
                }
                break;

            //Operacje skoku
            case 'J':
                { 
                    let dest=this.getTagPosition(order.args[0]);
                    if(dest!=-1) return dest;
                }
                break;
            case 'JP':
                {
                    let dest=this.getTagPosition(order.args[0]);
                    if(this.stateRegister.value==1&&dest!=-1) return dest;
                }
                break;
            case 'JN':
                {
                    let dest=this.getTagPosition(order.args[0]);
                    if(this.stateRegister.value==2&&dest!=-1) return dest;
                }
                break;
            case 'JZ':
                {
                    let dest=this.getTagPosition(order.args[0]);
                    if(this.stateRegister.value==0&&dest!=-1) return dest;
                }
                break;

            //Operacje przeniesienia danych
            case 'L':
                    this.transferData('C:'+order.args[1],'R:'+order.args[0],line);
                break;
            case 'LR':
                    this.transferData('R:'+order.args[1],'R:'+order.args[0],line);
                break;
            case 'ST':
                    this.transferData('R:'+order.args[0],'C:'+order.args[1],line);
                break;

            //Operacje artmetyczne
            case 'A':
                    this.mathOperation('A','C',line,...order.args);
                break;
            case 'AR':
                    this.mathOperation('A','R',line,...order.args);
                break;
            case 'S':
                    this.mathOperation('S','C',line,...order.args);
                break;
            case 'SR':
                    this.mathOperation('S','R',line,...order.args);
                break;
            case 'M':
                    this.mathOperation('M','C',line,...order.args);
                break;
            case 'MR':
                    this.mathOperation('M','R',line,...order.args);
                break;
            case 'D':
                    this.mathOperation('D','C',line,...order.args);
                break;
            case 'DR':
                    this.mathOperation('D','R',line,...order.args);
                break;
            case 'C':
                    this.mathOperation('C','C',line,...order.args);
                break;
            case 'CR':
                    this.mathOperation('C','R',line,...order.args);
                break;
            
        }

        return line;
    }

    getTagPosition(tag) {
        let result=-1;

        this.ordersList.forEach((el,index)=>{
            if(el.tag.trim()==tag.trim())
                result=index;
        });
        return result;
    }

    transferData(from,to,line) {
        from=from.split(':');
        to=to.split(':');
        let from_cell=(from[0]=='C');
        let to_cell=(to[0]=='C');

        let a;
        let b;
        
        if(from_cell)
            a=Cell.findCellsByAdress(from[1]);
        else
            a=Register.findRegisterByAdress(from[1]);

        if(to_cell)
            b=Cell.findCellsByAdress(to[1]);
        else
            b=Register.findRegisterByAdress(to[1]);

        if(b==null||a==null) {
            this.errorHandler(new Error('Błąd wykonawczy','Nie można odnaleść rejestru lub pamięci.',line));
            return;
        }
        else {
            b.value=a.value;

            if(b.value>=Math.pow(2,b.size-1)) {
                this.stateRegister.value=3;
                b.value=Math.pow(2,b.size-1)-1;
            }
            if(b.value<=-Math.pow(2,b.size-1)) {
                this.stateRegister.value=3;
                b.value=-Math.pow(2,b.size-1)+1;
            }
        }
      
    }

    mathOperation(type,source,line,...args) {
        let a=args[0];
        let b=args[1];
        if(!isNaN(a))
        {
            let a_value=Register.findRegisterByAdress(a);
            let b_value;
            if(source=='C')
            {
                b_value=Cell.findCellsByAdress(b);
            }
            else {
                b_value=Register.findRegisterByAdress(b);
            }

            if(a_value==null||b_value==null) {
                this.errorHandler(new Error('Błąd wykonawczy','Nie można odnaleść rejestru lub pamięci.',line));
                return;
            }
            else {
                let tmpReg=a_value.value;
                switch(type)
                {
                    case 'A':
                        a_value.value=Number(a_value.value)+Number(b_value.value);
                        break;
                    case 'S':
                        a_value.value=Number(a_value.value)-Number(b_value.value);
                        break;
                    case 'M':
                        a_value.value=Number(a_value.value)*Number(b_value.value);
                        break;
                    case 'D':
                        a_value.value=Number(a_value.value)/Number(b_value.value);
                        break;
                    case 'C':
                        a_value.value=Number(a_value.value)-Number(b_value.value);
                        break;
                }
                switch(Math.sign(a_value.value)) {
                    case -1: this.stateRegister.value=2;
                        break;
                    case 1: this.stateRegister.value=1;
                        break;
                    case 0: this.stateRegister.value=0;
                        break;
                }
                if(type=='C') {
                    a_value.value=tmpReg;
                }
                if(a_value.value>=Math.pow(2,a_value.size-1)) {
                    this.stateRegister.value=3;
                    a_value.value=Math.pow(2,a_value.size-1)-1;
                }
                if(a_value.value<=-Math.pow(2,a_value.size-1)) {
                    this.stateRegister.value=3;
                    a_value.value=-Math.pow(2,a_value.size-1)+1;
                }
               
            }
        }
        else {
            this.errorHandler(new Error('Błąd wykonawczy','Niepoprawny adres rejestru.',line));
                return; 
        }
    } 

    execute() {
        this.stateRegister=new Register('STATE',0,2);

        for(let i=0;i<this.ordersList.length;i++) {
            // try {
                i=this.executeLine(this.ordersList[i],i);
            // } catch(ex) {
            //     this.errorHandler(new Error('Błąd wykonawczy','Podczas wykonywania polecenia wystąpił błąd',i));
            // return;
            // }
        }
    }



}