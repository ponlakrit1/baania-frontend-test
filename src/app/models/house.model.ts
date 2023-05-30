export class HouseModel {
    public id: number;
    public name: string;
    public desc: string;
    public price: number;
    public post_code: string;
    
    constructor() {
        this.id = null;
        this.name = "";
        this.desc = "";
        this.price = null;
        this.post_code = "";
    }
}