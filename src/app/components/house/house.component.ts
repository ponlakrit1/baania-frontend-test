import { Component, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { ROOT_URL, ROOT_PORT } from '../../utils/config';
import { HouseService } from '../../services/house.service';
import { HouseResponseModel } from 'src/app/models/response/house-response.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HouseModel } from 'src/app/models/house.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostCodeResponseModel } from 'src/app/models/response/postcode-response.model';
import { AverageResponseModel } from 'src/app/models/response/average-response.model';
import { ConfirmationDialogService } from './../../components/confirm-dialog/confirm-dialog.service';
import { AlertDialogService } from './../../components/alert-dialog/alert-dialog.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HouseComponent implements OnInit {

  @ViewChild('houseModal', { static: true }) houseModal: TemplateRef<any>;

  public formGroup: FormGroup;
  public formObj: HouseModel;

  public rootURL: string;
  public rootPort: string;

  public dataList: HouseResponseModel;
  public postCodeList: PostCodeResponseModel;

  private skip: number = 0;
  private take: number = 100;
  public  page: number = 1;
  public  pageSize: number = 5;
  public  dataSize: number = 0;

  public mode: string;

  public selectedPostCode: string;
  public average: number;
  public median: number;

  public alertMsg: string;

  constructor(private houseService: HouseService, 
              private formBuilder: FormBuilder,
              private modalService: NgbModal,
              private confirmationDialogService: ConfirmationDialogService,
              private alertDialogService: AlertDialogService) {
    this.rootURL = ROOT_URL;
    this.rootPort = ROOT_PORT;

    this.dataList = new HouseResponseModel();
    this.postCodeList = new PostCodeResponseModel();
    this.formObj = new HouseModel();
  }

  ngOnInit(): void {
    this.initLoad();
    this.initForm();
  }

  initLoad() {
    this.loadHouse();
    this.loadPostCode();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      nameCtrl: ['', [Validators.required]],
      descCtrl: [''],
      priceCtrl: ['', [Validators.required]],
      postCodeCtrl: ['', [Validators.required]],
    });
  }

  get f() { return this.formGroup.controls; }

  getRootServiceURL() {
    return this.rootURL + ":" + this.rootPort;
  }

  async loadHouse() {
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

  async loadPostCode() {
    await this.houseService.findPostCode(this.getRootServiceURL()).subscribe(
      (res: PostCodeResponseModel) => {
        this.postCodeList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  openModal(modal: any, size: string) {
    this.modalService.open(modal, {size: size});
  }

  getErrorAlert() {
    
  }

  openCreateHouseModal() {
    this.mode = "I";

    this.resetForm();
    this.formObj = new HouseModel();
    this.openModal(this.houseModal, 'lg');
  }

  openUpdateHouseModal(data: HouseModel) {
    this.mode = "U";

    this.formObj = JSON.parse(JSON.stringify(data));
    this.openModal(this.houseModal, 'lg');
  }

  resetForm() {
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
    this.formGroup.updateValueAndValidity();
  }

  async onClickSave() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    await this.houseService.create(this.getRootServiceURL(), this.formObj).subscribe(
      res => {
        this.modalService.dismissAll();

        this.formObj = new HouseModel();

        this.alertDialogService.alert(true, "Create a Successful!");
        this.initLoad();
      },
      err => {
        console.log(err);
        this.alertDialogService.alert(false, "Let's try one more again");
      }
    );
  }

  async onClickUpdate() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    await this.houseService.update(this.getRootServiceURL(), this.formObj).subscribe(
      res => {
        this.modalService.dismissAll();

        this.formObj = new HouseModel();

        this.alertDialogService.alert(true, "Update a Successful!");
        this.initLoad();
      },
      err => {
        console.log(err);
        this.alertDialogService.alert(false, "Let's try one more again");
      }
    );
  }

  async onChangePostCode() {
    await this.houseService.findPostCodeById(this.getRootServiceURL(), this.selectedPostCode).subscribe(
      (res: AverageResponseModel) => {
        this.average = res.payload.average;
        this.median = res.payload.median;
      },
      err => {
        console.log(err);
      }
    );
  }

  onClickDelete(data: HouseModel) {
    this.confirmationDialogService.confirm('Confirm', 'Are you sure you want to delete this item?')
    .then((confirmed: boolean) => {
      if (confirmed) {
        this.deleteHouse(data);
      }
    })
    .catch(() => {
      console.log("delete error");
    });
  }

  async deleteHouse(data: HouseModel) {
    await this.houseService.delete(this.getRootServiceURL(), data).subscribe(
      res => {
        this.modalService.dismissAll();
        
        this.alertDialogService.alert(true, "Delete a Successful!");
        this.initLoad();
      },
      err => {
        console.log(err);
        this.alertDialogService.alert(false, "Let's try one more again");
      }
    );
  }

}
