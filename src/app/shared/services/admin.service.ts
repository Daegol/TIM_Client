import { Admin } from './../models/admin';
import { UserTable } from './../models/userTable';
import { UserRegistrationDto } from './../models/userRegistrationDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AdminService {
    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get<UserTable[]>(`${environment.apiUrl}admins`);
    }

    register(admin: UserRegistrationDto) {
        return this.http.post(`${environment.apiUrl}Authentication/register`, admin);
    }

    delete(pesel: string) {
        return this.http.delete(`${environment.apiUrl}admins/${pesel}`);
    }

    update(admin: Admin) {
        return this.http.put(`${environment.apiUrl}admins/update`, admin);
    }
}
