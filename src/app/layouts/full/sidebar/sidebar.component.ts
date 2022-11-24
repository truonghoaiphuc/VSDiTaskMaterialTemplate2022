import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MenuItems } from "../../../shared/menu-items/menu-items";
import { AuthenService } from "src/app/Services/authen.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: [],
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private _authService: AuthenService,
    private _router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia("(min-width: 768px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  Logout() {
    this._authService.logout();
    this._router.navigate(["/login"]);
  }
}
