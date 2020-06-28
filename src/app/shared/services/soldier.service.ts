import { UserTable } from './../models/userTable';
import { UserRegistrationDto } from './../models/userRegistrationDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Soldier } from '../models/soldier';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';
import {SoldiersInCompany} from '../models/soldiersInCompany';


@Injectable({ providedIn: 'root' })
export class SoldierService {
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<UserTable[]>(`${environment.apiUrl}soldier`);
  }

  register(soldier: UserRegistrationDto) {
    return this.http.post(`${environment.apiUrl}Authentication/register`, soldier);
  }

  delete(pesel: string) {
    return this.http.delete(`${environment.apiUrl}soldier/${pesel}`);
  }

  update(soldier: Soldier) {
    return this.http.put(`${environment.apiUrl}soldier/update`, soldier);
  }

  getToCompany() {
    return this.http.get<SoldiersInCompany[]>(`${environment.apiUrl}soldier/stg`);
  }

  getToCompanyEdit(classId: Guid) {
    return this.http.get<SoldiersInCompany[]>(`${environment.apiUrl}soldier/stg/${classId}`);
  }
}
