import { CompanyToEdit } from './../models/companyToEdit';
import { Guid } from 'guid-typescript';
import { CompanysTable } from 'src/app/shared/models/companysTable';
import { environment } from 'src/environments/environment';
import { CompanyToSend } from '../models/companyToSend';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  emptyGuid = Guid.createEmpty();
  private editedClass = new BehaviorSubject<CompanysTable>({
    databaseId: this.emptyGuid, name: '', commander: '', soldiersNumber: 0, id: 0, commanderPesel: ''
  });
  currentEditedClassId = this.editedClass.asObservable();

  constructor(private http: HttpClient) { }

  addCompany(company: CompanyToSend) {
    return this.http.post(`${environment.apiUrl}company/add`, company);
  }

  getAllCompanys() {
    return this.http.get<CompanysTable[]>(`${environment.apiUrl}company`);
  }

  removeCompany(id: Guid) {
    return this.http.delete(`${environment.apiUrl}company/${id}`);
  }

  updateCompany(companyToUpdate: CompanyToEdit) {
    return this.http.put(`${environment.apiUrl}company/update`, companyToUpdate);
  }

  changeEditedClassId(message: CompanysTable) {
    this.editedClass.next(message);
  }

}
