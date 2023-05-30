import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AlertDialogComponent } from './alert-dialog.component';

@Injectable()
export class AlertDialogService {

  constructor(private modalService: NgbModal) { }

  public alert(
    status: boolean,
    message: string,
    btnText: string = 'CONTINUE',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(AlertDialogComponent, { size: dialogSize });
    modalRef.componentInstance.status = status;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnText = btnText;

    return modalRef.result;
  }

}
