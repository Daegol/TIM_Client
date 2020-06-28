import { first } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, HostListener} from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import {AlertService} from "../../shared/services";
import {SoldierTable} from "../../shared/models/soldierTable";
import {SoldierService} from "../../shared/services/soldier.service";
import * as jwt_decode from "jwt-decode";
import {ModalAddOutgoingSoldierComponent} from "../../shared/modules/modal-add-outgoing-soldier/modal-add-outgoing-soldier.component";
import {outgoingSoldierAddDto} from "../../shared/models/outgoingSoldierAddDto";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  elements: SoldierTable[] = [];
  headElements = ['Id', 'Stopień', 'Imię', 'Nazwisko', 'Numer telefonu', 'Wyjście', 'Powrót', 'Akcja'];
  tableNames = ['id','militaryRank', 'firstName', 'lastName', 'phoneNumber', 'outgoingTime','backTime'];
  searchText = '';
  previous: string;

  modalRef: MDBModalRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
     private soldierService: SoldierService,
     private alertService: AlertService,
  ) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const decodedToken = this.getDecodedAccessToken(currentUser.token);
    this.getSoldiers(decodedToken.nameid);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  getSoldiers(soldierOnDutyId: any) {
    this.soldierService.getAll(soldierOnDutyId).pipe(first()).subscribe(
      data => {
        this.elements = data;
        this.mdbTable.setDataSource(this.elements);
        this.previous = this.mdbTable.getDataSource();
      },
      error => {
        this.alertService.error(error.message);
      });

  }
  @HostListener('input') oninput() { this.searchItems(); }

  searchItems() {
    const prev =
      this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous); this.elements =
        this.mdbTable.getDataSource();

    }
    if (this.searchText) {
      this.elements =
        this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }


  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(6);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  removeRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.soldierService.delete(this.elements[elementIndex].pesel).pipe(first()).subscribe(
      success => {
        this.alertService.success('Użytkownik został usunięty');
        //this.getStudents();
      },
      error => {
        this.alertService.error(error.message);
      }

    );
    this.mdbTable.setDataSource(this.elements);
  }

  addRow() {
    this.modalRef = this.modalService.show(ModalAddOutgoingSoldierComponent);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: outgoingSoldierAddDto) => {
      //newElement.Role = 'Student';
      this.soldierService.add(newElement).pipe(first()).subscribe(
        data => {
          this.alertService.success('Dodano nowego żołnierza wychodzącego');
          //this.getSoldiers();
        },
        error => {
          this.alertService.error(error.message);
        });
    });
  }

}
