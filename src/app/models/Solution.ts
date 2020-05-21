import BugReport from './BugReport';
import Client from './Client'

export class Solution {
   id: number;
   status: string;
   timeSubmitted: number;
   title: string;
   description: string;
   br = new BugReport();
   client: Client;
}
export default Solution;