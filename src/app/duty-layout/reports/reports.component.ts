import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, MDBModalService, MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {Report} from "../../shared/models/report";
import {AlertService, SoldierService} from "../../shared/services";
import {first} from "rxjs/operators";
import {ModalAddOutgoingSoldierComponent} from "../../shared/modules/modal-add-outgoing-soldier/modal-add-outgoing-soldier.component";
import {outgoingSoldierAddDto} from "../../shared/models/outgoingSoldierAddDto";
import * as jwt_decode from "jwt-decode";
import {ReportService} from "../../shared/services/report.service";
import {ModalAddReportComponent} from "../../shared/modules/modal-add-report/modal-add-report.component";
import {reportAddDto} from "../../shared/models/reportAddDto";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  elements: Report[] = [];
  headElements = [ 'Podoficer Dyżurny Kompanii', 'Treść Meldunku'];
  tableNames = ['soldierId', 'text'];
  searchText = '';
  previous: string;

  modalRef: MDBModalRef;
  constructor(private cdRef: ChangeDetectorRef,
              private modalService: MDBModalService,
              private reportService: ReportService,
              private alertService: AlertService,) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const decodedToken = this.getDecodedAccessToken(currentUser.token);
    //this.getSoldiers(decodedToken.nameid);
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  getReports(soldierOnDutyId: any) {
    this.reportService.getAll(soldierOnDutyId).pipe(first()).subscribe(
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

  // removeRow(el: any) {
  //   const elementIndex = this.elements.findIndex((elem: any) => el === elem);
  //   this.soldierService.deleteLeave(this.elements[elementIndex].soldierId).pipe(first()).subscribe(
  //     success => {
  //       this.alertService.success('Żołnierz wrócił na pododdział');
  //       //this.getStudents();
  //     },
  //     error => {
  //       this.alertService.error(error.message);
  //     }
  //
  //   );
  //   this.mdbTable.setDataSource(this.elements);
  // }

  addRow() {
    this.modalRef = this.modalService.show(ModalAddReportComponent);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: reportAddDto) => {
      //newElement.Role = 'Student';
      this.reportService.add(newElement).pipe(first()).subscribe(
        data => {
          this.alertService.success('Dodano meldunek');
          //this.getSoldiers();
        },
        error => {
          this.alertService.error(error.message);
        });
    });
  }
}
