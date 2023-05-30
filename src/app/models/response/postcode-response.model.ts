import { PostCodeModel } from "../postcode.model";

export class PostCodeResponseModel {
    public payload: PostCodeModel[];
    public count: number;
    
    constructor() {
        this.payload = [];
        this.count = null;
    }
}