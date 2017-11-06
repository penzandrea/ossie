/* * * ./app/comments/model/comment.ts * * */
export class Aspect {
    constructor(
        public id: number, 
        public name: string, 
        public description: string,
        public children: Aspect[],
    ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.children = children;
    }

    copyInto(json: any){
            this.id = json.id;
        this.name = json.name;
        this.description = json.description;
        this.children = null;
    }
}