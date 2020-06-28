import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {MDBModalRef} from "angular-bootstrap-md";
import {first} from "rxjs/operators";
import {outgoingSoldierAddDto} from "../../models/outgoingSoldierAddDto";
import {SoldierService} from "../../services/soldier.service";

@Component({
  selector: 'app-modal-add-outgoing-soldier',
  templateUrl: './modal-add-outgoing-soldier.component.html',
  styleUrls: ['./modal-add-outgoing-soldier.component.scss']
})
export class ModalAddOutgoingSoldierComponent {

  validationForm: FormGroup;
  public saveButtonClicked: Subject<any> = new Subject<any>();
  public newRow: outgoingSoldierAddDto;
  //public isParent: boolean = false;
  //studentsElements: StudentToParent[] =[];

  constructor(public fb: FormBuilder, public modalRef: MDBModalRef, private soldierService: SoldierService) {
    // soldierService.getToParent().pipe(first()).subscribe(
    //   result => {
    //     this.studentsElements = result;
    //   }
    //)
    this.validationForm = fb.group({
      militaryRankForm: [null, [Validators.required]],
      phoneForm: [null, [Validators.required, Validators.pattern('[0-9]{9}')]],
      lastNameForm: [null, Validators.required],
      firstNameForm: [null, Validators.required],
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
      MilitaryRank: this.militaryRankForm.value, FirstName: this.firstNameForm.value, LastName: this.lastNameForm.value, PhoneNumber: this.phoneForm.value
    };
    this.saveButtonClicked.next(this.newRow);
    this.modalRef.hide();
  }

  get militaryRankForm() { return this.validationForm.get('militaryRankForm'); }
  get phoneForm() { return this.validationForm.get('phoneForm'); }
  get lastNameForm() { return this.validationForm.get('lastNameForm'); }
  get firstNameForm() { return this.validationForm.get('firstNameForm'); }

}
