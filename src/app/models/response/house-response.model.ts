import { HouseModel } from "../house.model";

export class HouseResponseModel {
    public payload: HouseModel[];
    public count: number;
    
    constructor() {
        this.payload = [];
        this.count = null;
    }
}