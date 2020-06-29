import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Report} from "../models/report";
import {outgoingSoldierAddDto} from "../models/outgoingSoldierAddDto";
import {reportAddDto} from "../models/reportAddDto";

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) { }

  getAll(soldierOnDutyId: any) {
    return this.http.get<Report[]>(`${environment.apiUrl}Report/reports/${soldierOnDutyId}`);
  }
  add(report: reportAddDto) {
    return this.http.post(`${environment.apiUrl}Report/add`, report);
  }

}
