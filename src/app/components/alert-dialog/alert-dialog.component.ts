import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  @Input() status: boolean;
  @Input() message: string;
  @Input() description: string;
  @Input() btnText: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
