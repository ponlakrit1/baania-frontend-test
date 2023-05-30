import { Component, OnInit } from '@angular/core';
import { ROOT_URL, ROOT_PORT } from '../../utils/config';
import { HouseService } from '../../services/house.service';
import { HouseResponseModel } from 'src/app/models/response/house-response.model';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {

  public rootURL: string;
  public rootPort: string;

  public dataList: HouseResponseModel;

  private skip: number = 0;
  private take: number = 100;
  public  page: number = 1;
  public  pageSize: number = 10;
  public  dataSize: number = 0;

  constructor(private houseService: HouseService) {
    this.rootURL = ROOT_URL;
    this.rootPort = ROOT_PORT;

    this.dataList = new HouseResponseModel();
  }

  ngOnInit(): void {
    this.initLoad();
  }

  async initLoad() {
    await this.houseService.findSkipAndTake(this.getRootServiceURL(), this.skip, this.take).subscribe(
      (res: HouseResponseModel) => {
        this.dataList = res;
        this.dataSize = this.dataList.payload.length;
        this.page = 1;
      },
      err => {
        console.log(err);
      }
    );
  }

  getRootServiceURL() {
    return this.rootURL + ":" + this.rootPort;
  }

}
