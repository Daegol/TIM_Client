import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SoldierTable } from './../models/soldierTable';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';
import {outgoingSoldierAddDto} from "../models/outgoingSoldierAddDto";

@Injectable({ providedIn: 'root' })
export class SoldierService {
  constructor(private http: HttpClient) { }

  getAll(soldierOnDutyId: any) {
    return this.http.get<SoldierTable[]>(`${environment.apiUrl}OutgoingBook/outgoingSoldiers/${soldierOnDutyId}`);
  }

  add(soldier: outgoingSoldierAddDto) {
    return this.http.post(`${environment.apiUrl}OutgoingBook/add`, soldier);
  }

  delete(leaveId: any) {
    return this.http.delete(`${environment.apiUrl}/OutgoingBook/delete/${leaveId}`);
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
