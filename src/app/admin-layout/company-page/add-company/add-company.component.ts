import { CompanyToSend } from '../../../shared/models/companyToSend';
import { CommanderInCompany } from './../../../shared/models/commanderInCompany';
import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { SoldierService, AlertService, CommanderService, CompanyService } from 'src/app/shared';
import { SoldiersInCompany } from 'src/app/shared/models/soldiersInCompany';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  soldierElements: SoldiersInCompany[] = [];
  commanderElements: CommanderInCompany[] = [];
  soldierHeadElements = ['Wybierz', 'Imię', 'Nazwisko', 'Pesel', 'Klasa'];
  soldierTableNames = ['isChecked', 'firstName', 'lastName', 'pesel', 'soldierClass'];
  searchText = '';
  previous: string;
  form: FormGroup;

  modalRef: MDBModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private soldierService: SoldierService,
    private commanderService: CommanderService,
    private alertService: AlertService,
    private companyService: CompanyService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(1)]],
      commander: new FormControl('0')
    }, {validators: commanderValidator});
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
        },
        error => {
          this.alertService.error(error.message);
        });
  }

  getSoldiersToCompany() {
    this.soldierService.getToCompany().pipe(first())
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

  addCompany() {
    const company: CompanyToSend = { name: this.form.value.name, commanderId: this.form.value.commander, soldiersId: this.getCheckedSoldiers() };
    this.companyService.addCompany(company).pipe(first()).subscribe(
      request => {
        this.alertService.success('Dodano grupę', true);
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
