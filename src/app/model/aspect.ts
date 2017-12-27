/* * * ./app/comments/model/comment.ts * * */
export class Aspect {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public children?: Aspect[],
    ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.children = children;
    }


    static generateTree(serverNodes: Aspect[], startNode: number): Aspect[] {
        let searchedAspChildren:Aspect[];
        let searchedAspChildrenwithChildren:Aspect[];
        let tree: Aspect[] = [new Aspect(4,"","",null)];

        console.log("FRESH");
        console.log(serverNodes);

        // search for the one tree root aspect node
        serverNodes.forEach((asp, i) => {
            if (asp.id == startNode) {

                // set tree root to be the defined startnode
                tree[0] = asp;

                // start children-adding-process with startnode as the base
                serverNodes.forEach((aspect, x) => {
                    asp.children.forEach((child, y) => {
                        if(aspect.id == child.id){
                            asp.children[y] = serverNodes[x];
                        }
                    });
                });
                tree[0].children = asp.children;
            }
        });



        serverNodes.forEach((asp, i) => {
            console.log(typeof asp + ' ' + i + asp);
        });
        console.log(serverNodes[0]);


        console.log("MODIFIED");
        console.log(serverNodes);

        console.log("TREE");
        console.log(tree);
        //console.log(tree.);

        return tree;

        /*        allAspArray.forEach((asp, i) => {
         if (asp.id == startNode) {
         searchedAspChildren = asp.children;
         }
         });
         searchedAspChildren.forEach((aspChild, i) => {
         if (aspChild.id == startNode) searchedAspChildren = asp.children;
         });*/
        /*            allAspArray[certainAspID].children.forEach((asp, i) => {
         console.log("enter ASPECTFROMID !!!!");

         console.log(allAspArray[i]);
         });*/
    }

    static fromJson(json: Object){
        return new Aspect(json['id'], json['name'], json['description'], json['children']);
    }

    // New static method.
    static fromJSONArray(array: Array<Object>): Aspect[] {
        return array.map(obj => new Aspect(obj['id'], obj['name'], obj['description'], obj['children']));
    }

}