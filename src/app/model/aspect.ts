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

    isEmpty(obj: Aspect) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}
    static getFromBaseArray(baseArray: Aspect[], aspChildren: Aspect[]): Aspect[] {

            console.log('childrenstart');
        console.log(aspChildren);
        console.log(typeof aspChildren);
        aspChildren.forEach((a,h) => {console.log(typeof aspChildren[h]);})

        console.log('BASEARRAYSTART');
        console.log(baseArray);

        baseArray.forEach((baseEntry, x) => {
                aspChildren.forEach((aspChildEntry, y) => {
                    if(baseEntry.id == aspChildEntry.id){
                        aspChildren[y] = baseArray[x];
                         console.log(baseArray[x].id);
                        console.log(baseArray[x].children);

                         console.log("DA HATS WAS");
                         console.log(baseArray[x].id);
                        // console.log(aspChildren[y]);
                        //delete baseArray[x];
                        if (x != -1) {
                            console.log('delete' + baseArray[x].id);

                            console.log("splice" + x);
                            //baseArray.splice(x, 1);
                        }
                    }
                });

            });
        baseArray.forEach((baseEntry, x) => {
            aspChildren.forEach((aspChildEntry, y) => {
                if(baseEntry.id == aspChildEntry.id){
                    //delete baseArray[x];
                    if (x != -1) {
                        console.log('delete' + baseArray[x].id);

                        console.log("splice" + x);
                        //baseArray.splice(x, 1);
                    }
                }
            });
        });

        // console.log("ODER NICHT");
        //
        //     console.log('return child array to add to '+)
        //     console.log(aspChildren);
        console.log('childrenend');
        console.log(aspChildren);

        console.log('BASEARRAYEND');
        console.log(baseArray);

            return aspChildren;
    }
    static aspectFromId(allAspArray: Aspect[], startNode: number): Aspect[] {
        let searchedAspChildren:Aspect[];
        let searchedAspChildrenwithChildren:Aspect[];
        let tree: Aspect[] = [new Aspect(4,"","",null)];

        console.log("FRESH");
        console.log(allAspArray);

        allAspArray.forEach((asp, i) => {
            if (asp.id == startNode) {
                //topLevel
                //console.log("asp");
                console.log(asp);

                tree[0] = asp;
                //delete allAspArray[i];
                //var index = myArray.indexOf(key, 0);
                if (i != -1) {
                   //allAspArray.splice(i, 1);
                }
                //incomplete children from first level node
                //firstLevel

                console.log("asp.allAspArray after first removement");
                console.log(allAspArray);
                tree[0].children = this.getFromBaseArray(allAspArray, asp.children);
            }
        });



        allAspArray.forEach((asp, i) => {
            console.log(typeof asp + ' ' + i + asp);
        });
        console.log(allAspArray[0]);


        console.log("MODIFIED");
        console.log(allAspArray);

        console.log("TREE");
        console.log(tree);

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