import { CompanysTable } from 'src/app/shared/models/companysTable';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MDBModalRef } from 'angular-bootstrap-md';
import { SoldiersInCompany } from 'src/app/shared/models/soldiersInCompany';
import { CommanderInCompany } from 'src/app/shared/models/commanderInCompany';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { SoldierService, CommanderService, AlertService, CompanyService } from 'src/app/shared';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CompanyToEdit } from 'src/app/shared/models/companyToEdit';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  soldierElements: SoldiersInCompany[] = [];
  commanderElements: CommanderInCompany[] = [];
  soldierHeadElements = ['Wybierz', 'Imię', 'Nazwisko', 'Pesel', 'Klasa'];
  soldierTableNames = ['isChecked', 'firstName', 'lastName', 'pesel', 'company'];
  searchText = '';
  previous: string;
  form: FormGroup;
  currentEditedClass: CompanysTable;

  modalRef: MDBModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private soldierService: SoldierService,
    private commanderService: CommanderService,
    private alertService: AlertService,
    private companyService: CompanyService,
    private router: Router) { }

  ngOnInit() {
    this.companyService.currentEditedClassId.subscribe(message => this.currentEditedClass = message);
    this.form = this.formBuilder.group({
      name: [this.currentEditedClass.name, [Validators.required, Validators.minLength(1)]],
      commander: new FormControl('0')
    }, { validators: commanderValidator });
    this.getCommandersToCompany();
    this.getSoldiersToCompany();
  }

  @HostListener('input') oninput() { this.searchItems(); }

  searchItems() {
    const prev =
      this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous); this.soldierElements =
        this.mdbTable.getDataSource();

    }
    if (this.searchText) {
      this.soldierElements =
        this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  getCommandersToCompany() {
    this.commanderService.getToCompany().pipe(first())
      .subscribe(
        result => {
          this.commanderElements = result;
          this.form.controls.commander.setValue(this.currentEditedClass.commanderPesel);
        },
        error => {
          this.alertService.error(error.message);
        });
  }

  getSoldiersToCompany() {
    this.soldierService.getToCompanyEdit(this.currentEditedClass.databaseId).pipe(first())
      .subscribe(
        result => {
          this.soldierElements = result;
          this.mdbTable.setDataSource(this.soldierElements);
          this.previous = this.mdbTable.getDataSource();
        },
        error => {
          this.alertService.error(error.message);
        });
  }

  editCompany() {
    const company: CompanyToEdit = {
      name: this.form.value.name, commanderId: this.form.value.commander,
      soldiersId: this.getCheckedSoldiers(), companyId: this.currentEditedClass.databaseId
    };
    this.companyService.updateCompany(company).pipe(first()).subscribe(
      request => {
        this.alertService.success('Edytowano grupę', true);
        this.router.navigate(['admin/company-page']);
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  getCheckedSoldiers() {
    const soldiers: Guid[] = [];
    this.soldierElements.forEach(element => {
      if (element.isAssigned) {
        soldiers.push(element.id);
      }
    });
    return soldiers;
  }

  get name() { return this.form.get('name'); }


  cancel() {
    this.router.navigate(['admin/company-page']);
  }
}

export const commanderValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const commander = control.get('commander');

  return commander.value !== '0' ? null : { identityRevealed: true };
};
