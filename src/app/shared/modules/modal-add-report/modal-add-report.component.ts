import {Component, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {outgoingSoldierAddDto} from "../../models/outgoingSoldierAddDto";
import {SoldiersInCompany} from "../../models/soldiersInCompany";
import {AlertService, SoldierService} from "../../services";
import {first} from "rxjs/operators";
import {ReportService} from "../../services/report.service";
import {reportAddDto} from "../../models/reportAddDto";
import {getLocaleDateTimeFormat} from "@angular/common";
import * as jwt_decode from "jwt-decode";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-modal-add-report',
  templateUrl: './modal-add-report.component.html',
  styleUrls: ['./modal-add-report.component.scss']
})
export class ModalAddReportComponent {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  validationForm: FormGroup;
  public saveButtonClicked: Subject<any> = new Subject<any>();
  public newRow: reportAddDto;
  soldierElements: SoldiersInCompany[] = [];
  previous: string;

  constructor(public fb: FormBuilder, public modalRef: MDBModalRef, private reportService: ReportService, private alertService: AlertService) {
    this.validationForm = fb.group({
      textForm: [null, [Validators.required]],
    });
  }

  ngOnInit() {

  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }
  currentDate = new Date().toString();
  
  addRow() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const decodedToken = this.getDecodedAccessToken(currentUser.token);

    this.newRow = {
      text: this.textForm.value, date: this.currentDate, soldierId: decodedToken
    };
    this.saveButtonClicked.next(this.newRow);
    this.modalRef.hide();
  }

  get textForm() { return this.validationForm.get('textForm'); }


}
