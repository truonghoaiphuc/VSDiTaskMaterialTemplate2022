import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenService } from "src/app/Services/authen.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: [],
})
export class AppHeaderComponent {
  constructor(private _authService: AuthenService, private _router: Router) {}

  Logout() {
    this._authService.logout();
    this._router.navigate(["/login"]);
  }
}
