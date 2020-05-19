import Application from './Application'
import Solution from './Solution'

export class BugReport {
    bId: string;
    title: string;
    username: string;

    description: string;
    location: string;
    repSteps: string;
    
    dateCreated: number;
    approvedTime: number;
    resolvedTime: number;

    priority: string;
    severity: string;
    pointValue: number;
    status: string;
    
    app: Application;
    solutions: Solution[];
}
export default BugReport;