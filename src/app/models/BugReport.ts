import Application from './Application';
import Solution from './Solution';
import Priority from './Priority';
import Severity from './Severity';
import BugStatus from './BugStatus';

export class BugReport {
    bId: number;
    title: string;
    username: string;
    description: string;
    location: string;
    repSteps: string;

    dateCreated: number; // schaud added
  
    createdTime: number;
    approvedTime: number;
    resolvedTime: number;
 

    priority: Priority;
    severity: Severity;
 
    pointValue: number;
    status: BugStatus;

    app: Application;
    solutions: Solution[];
}
export default BugReport;
