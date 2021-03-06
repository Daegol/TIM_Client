import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {SoldierTable} from "../../shared/models/soldierTable";
import {AlertService, SoldierService} from "../../shared/services";
import {first} from "rxjs/operators";
import {ModalAddOutgoingSoldierComponent} from "../../shared/modules/modal-add-outgoing-soldier/modal-add-outgoing-soldier.component";
import {outgoingSoldierAddDto} from "../../shared/models/outgoingSoldierAddDto";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss']
})
export class SettlementComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  elements: SoldierTable[] = [];
  headElements = [ 'Stopień', 'Imię', 'Nazwisko', 'Status'];
  tableNames = ['militaryRank', 'firstName', 'lastName', 'status'];
  searchText = '';
  previous: string;

  modalRef: MDBModalRef;

  constructor(private cdRef: ChangeDetectorRef,
              private modalService: MDBModalService,
              private soldierService: SoldierService,
              private alertService: AlertService,) { }

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
    this.soldierService.getAllSettlement(soldierOnDutyId).pipe(first()).subscribe(
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
    this.soldierService.deleteLeave(this.elements[elementIndex].soldierId).pipe(first()).subscribe(
      success => {
        this.alertService.success('Żołnierz wrócił na pododdział');
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
