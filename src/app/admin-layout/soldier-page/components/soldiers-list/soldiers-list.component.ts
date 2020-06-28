import { first } from 'rxjs/operators';
import { SoldierService } from './../../../../shared/services/soldier.service';
import { UserTable } from './../../../../shared/models/userTable';
import { UserRegistrationDto } from './../../../../shared/models/userRegistrationDto';
import { ModalAddComponent } from './../../../../shared/modules/modal-add/modal-add.component';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalEditComponent } from 'src/app/shared/modules/modal-edit/modal-edit.component';
import { AlertService } from 'src/app/shared';
import { Soldier } from 'src/app/shared/models/soldier';


@Component({
  selector: 'app-soldiers-list',
  templateUrl: './soldiers-list.component.html',
  styleUrls: ['./soldiers-list.component.scss']
})
export class SoldiersListComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  elements: UserTable[] = [];
  headElements = ['Id','Stopień', 'Imię', 'Nazwisko', 'Email', 'Pesel', 'Numer telefonu', 'Adres', 'Akcja'];
  tableNames = ['id','militaryRank', 'firstName', 'lastName', 'email', 'pesel', 'phoneNumber', 'address'];
  searchText = '';
  previous: string;

  modalRef: MDBModalRef;

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private soldierService: SoldierService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getSoldiers();
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

  editRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    const modalOptions = {
      data: {
        editableRow: el
      }
    };
    this.modalRef = this.modalService.show(ModalEditComponent, modalOptions);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: Soldier) => {
      this.soldierService.update(newElement).pipe(first()).subscribe(
        data => {
          this.alertService.success('Dane użytkownika zostały zaaktualizowane');
          this.getSoldiers();
        },
        error => {
          this.alertService.error(error.message);
        });
    });
    this.mdbTable.setDataSource(this.elements);
  }

  removeRow(el: any) {
    const elementIndex = this.elements.findIndex((elem: any) => el === elem);
    this.soldierService.delete(this.elements[elementIndex].pesel).pipe(first()).subscribe(
      success => {
        this.alertService.success('Użytkownik został usunięty');
        this.getSoldiers();
      },
      error => {
        this.alertService.error(error.message);
      }

    );
    this.mdbTable.setDataSource(this.elements);
  }

  addRow() {
    this.modalRef = this.modalService.show(ModalAddComponent);
    this.modalRef.content.saveButtonClicked.subscribe((newElement: UserRegistrationDto) => {
      newElement.Role = 'Soldier';
      this.soldierService.register(newElement).pipe(first()).subscribe(
        data => {
          this.alertService.success('Dodano nowego użytkownika');
          this.getSoldiers();
        },
        error => {
          this.alertService.error(error.message);
        });
    });
  }

  getSoldiers() {
    this.soldierService.getAll().pipe(first()).subscribe(
      data => {
        this.elements = data;
        this.mdbTable.setDataSource(this.elements);
        this.previous = this.mdbTable.getDataSource();
      },
      error => {
        this.alertService.error(error.message);
      });

  }

}
