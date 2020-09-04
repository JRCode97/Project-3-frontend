import BugReport from 'src/app/models/BugReport';
import Solution from 'src/app/models/Solution';

export class ClientDTO {
    
    cId: number;
    firstName: string;
    lastName: string;
    
    bugs: Array<BugReport>;
    sols: Array<Solution>;

    avgNumToResolveBug: number;
    
    constructor(cId: number, firstname: string, lastname: string, bugs: Array<BugReport>, sols: Array<Solution>, avgNumToResolveBug: number) {
        this.cId = cId;
        this.firstName = firstname;
        this.lastName = lastname;
        this.bugs = bugs;
        this.sols = sols;
        this.avgNumToResolveBug= avgNumToResolveBug;
    }
}

export class DataPoint {
    x:Date ;
    y: number;
    
    label: string;
    
    constructor({x,y,label}: { x?:Date, y?: number,  label?: string} ) {
        this.x=x;
        this.y = y;
        this.label = label;
    }
    
}


export class DataObject{
    
    type: string;// "line",
    axisYType:string; // "secondary",
    name: string; //"Seatle",
    showInLegend: boolean; //true,
    markerSize: number; // 0,
    yValueFormatString: string // "$#,###k",
    dataPoints: Array<DataPoint>;
    //{ x: new Date(2014, 00, 01), y: 409 },
    
    constructor({type, axisYType, name, showInLegend, markerSize, 
        yValueFormatString, dataPoints} : {type?:string, axisYType?: string 
        , name?:string, showInLegend?:boolean, markerSize?:number
        , yValueFormatString?:string, dataPoints:Array<DataPoint>}){
                
            this.type= type;
            this.axisYType=axisYType;
            this.name=name;
            this.showInLegend=showInLegend;
            this.markerSize=markerSize;
            this.yValueFormatString=yValueFormatString;
            this.dataPoints=dataPoints;
                
                
            }
            
        }

