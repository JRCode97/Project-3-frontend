export class Application{
    id:number
    title:string
    gitLink:string
    // reports : List<BugReport>



    constructor(id:number, title:string, gitLink:string){
        this.id = id;
        this.title = title;
        this.gitLink = gitLink;
    }
}