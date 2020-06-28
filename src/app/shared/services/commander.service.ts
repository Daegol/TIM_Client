import { Commander } from './../models/commander';
import { UserTable } from './../models/userTable';
import { UserRegistrationDto } from './../models/userRegistrationDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {CommanderInCompany} from '../models/commanderInCompany';


@Injectable({ providedIn: 'root' })
export class CommanderService {
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<UserTable[]>(`${environment.apiUrl}commanders`);
  }

  register(commander: UserRegistrationDto) {
    return this.http.post(`${environment.apiUrl}Authentication/register`, commander);
  }

  delete(pesel: string) {
    return this.http.delete(`${environment.apiUrl}commanders/${pesel}`);
  }

  update(commander: Commander) {
    return this.http.put(`${environment.apiUrl}commanders/update`, commander);
  }

  getToCompany() {
    return this.http.get<CommanderInCompany[]>(`${environment.apiUrl}commanders/tig`);
  }
}
