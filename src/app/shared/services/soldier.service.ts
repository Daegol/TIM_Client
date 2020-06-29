import { UserTable } from './../models/userTable';
import { UserRegistrationDto } from './../models/userRegistrationDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Soldier } from '../models/soldier';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';
import {SoldiersInCompany} from '../models/soldiersInCompany';
import { SoldierTable } from './../models/soldierTable';
import {outgoingSoldierAddDto} from "../models/outgoingSoldierAddDto";

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

  getAllLeaves(soldierOnDutyId: any) {
    return this.http.get<SoldierTable[]>(`${environment.apiUrl}OutgoingBook/outgoingSoldiers/${soldierOnDutyId}`);
  }

  getAllSettlement(soldierOnDutyId: any) {
    return this.http.get<SoldierTable[]>(`${environment.apiUrl}Soldier/soldiers/${soldierOnDutyId}`);
  }

  add(soldier: outgoingSoldierAddDto) {
    return this.http.post(`${environment.apiUrl}OutgoingBook/add`, soldier);
  }

  deleteLeave(leaveId: any) {
    return this.http.delete(`${environment.apiUrl}OutgoingBook/delete/${leaveId}`);
  }
  //
  // update(student: Student) {
  //   return this.http.put(`${environment.apiUrl}students/update`, student);
  // }

  // getToGroup() {
  //   return this.http.get<StudentsInGroup[]>(`${environment.apiUrl}students/stg`);
  // }
  //
  // getToGroupEdit(classId: Guid) {
  //   return this.http.get<StudentsInGroup[]>(`${environment.apiUrl}students/stg/${classId}`);
  // }
  //
  // getToGrades(classId: Guid, subjectId: Guid) {
  //   return this.http.get<StudentToGrade[]>(`${environment.apiUrl}students/grade/${classId}/${subjectId}`);
  // }
  //
  // getToParent() {
  //   return this.http.get<StudentToParent[]>(`${environment.apiUrl}students/parent`);
  // }
}
