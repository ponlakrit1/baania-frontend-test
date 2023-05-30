export class AlertModel {
    public alertStatus: boolean;
    public alertMsg: string;
    
    constructor() {
        this.alertStatus = false;
        this.alertMsg = "";
    }
}