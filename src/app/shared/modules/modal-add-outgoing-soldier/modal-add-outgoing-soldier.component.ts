import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {MDBModalRef, MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {first} from "rxjs/operators";
import {outgoingSoldierAddDto} from "../../models/outgoingSoldierAddDto";
import {SoldierService} from "../../services/soldier.service";
import {SoldiersInCompany} from "../../models/soldiersInCompany";
import {AlertService} from "../../services";
import {commanderValidator} from "../../../admin-layout/company-page/add-company/add-company.component";

@Component({
  selector: 'app-modal-add-outgoing-soldier',
  templateUrl: './modal-add-outgoing-soldier.component.html',
  styleUrls: ['./modal-add-outgoing-soldier.component.scss']
})
export class ModalAddOutgoingSoldierComponent {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  validationForm: FormGroup;
  public saveButtonClicked: Subject<any> = new Subject<any>();
  public newRow: outgoingSoldierAddDto;
  soldierElements: SoldiersInCompany[] = [];
  previous: string;
  //public isParent: boolean = false;
  //studentsElements: StudentToParent[] =[];

  constructor(public fb: FormBuilder, public modalRef: MDBModalRef, private soldierService: SoldierService, private alertService: AlertService) {
    // soldierService.getToParent().pipe(first()).subscribe(
    //   result => {
    //     this.studentsElements = result;
    //   }
    //)
    this.validationForm = fb.group({
      soldierForm: [null, [Validators.required]],
      startDateForm: [null, [Validators.required]],
      endDateForm: [null, [Validators.required]],
      whereForm: [null, Validators.required],
      typeForm: [null, Validators.required],
    });
  }
  ngOnInit() {
    this.getSoldiers();
  }

  getSoldiers() {
    this.soldierService.getToCompany().pipe(first())
      .subscribe(
        result => {
          this.soldierElements = result;
          // this.mdbTable.setDataSource(this.soldierElements);
          // this.previous = this.mdbTable.getDataSource();
        },
        error => {
          this.alertService.error(error.message);
        });
  }
  addRow() {
    //const student = this.studentsElements.filter(x => x.pesel === this.child.value);
    // let soldierId: string;
    // if (soldierId.length === 0) {
    //   soldierId = "empty";
    // } else {
    //   soldierId = soldier[0].id.toString();
    // }
    this.newRow = {
      StartDate: this.startDateForm.value, EndDate: this.endDateForm.value,
      Where: this.whereForm.value, Type: this.typeForm.value, SoldierId: this.soldierForm.value
      //TUTAJ KURWA ID
    };
    this.saveButtonClicked.next(this.newRow);
    this.modalRef.hide();
  }
  get soldierForm() { return this.validationForm.get('soldierForm'); }
  get startDateForm() { return this.validationForm.get('startDateForm'); }
  get endDateForm() { return this.validationForm.get('endDateForm'); }
  get whereForm() { return this.validationForm.get('whereForm'); }
  get typeForm() { return this.validationForm.get('typeForm'); }

}
