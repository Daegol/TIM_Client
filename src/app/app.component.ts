import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) {
      this.router.navigate(["login"]);
    } else {
      const decodedToken = this.getDecodedAccessToken(currentUser.token);
      if (decodedToken.role === "Admin") {
        this.router.navigate(["admin"]);
      }
      if (decodedToken.role === "Soldier") {
        this.router.navigate(["soldier"])
      }
      if (decodedToken.role === "Soldier") {
        this.router.navigate(["duty"]);
      }
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }
}
