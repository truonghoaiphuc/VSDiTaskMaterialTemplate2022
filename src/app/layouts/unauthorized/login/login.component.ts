import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { RxState } from "@rx-angular/state";
import { Observable, of, Subject } from "rxjs";
import { catchError, mergeMap, filter } from "rxjs/operators";
import { AuthenService } from "src/app/Services/authen.service";
import { UserService } from "src/app/Services/user.service";
import { LoginState } from "../state";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [RxState],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;
  onSubmit = new Subject<void>();
  onSubmitHandler$ = new Subject<{ userName: string; password: string }>();

  get state$(): Observable<LoginState> {
    return this._state.select();
  }

  constructor(
    private _userService: UserService,
    private _authService: AuthenService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _state: RxState<LoginState>
  ) {
    this._state.set({ hasError: false });
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  private manageEvents() {
    this._state.hold(this.onSubmit, () => {
      const valid = this.loginForm.valid;
      this._state.set({
        hasError: !valid,
      });
      if (!valid) {
        return;
      }

      this.onSubmitHandler$.next({
        userName: this.loginForm.controls["userName"].value,
        password: this.loginForm.controls["password"].value,
      });
    });
  }

  private connectState(): void {
    const handler$ = this.onSubmitHandler$.pipe(
      mergeMap((data) =>
        this._userService
          .login(data.userName, data.password)
          .pipe(
            catchError((err: { statusCode: string }) =>
              of({ statusCode: err.statusCode, token: "" })
            )
          )
      )
    );

    this._state.connect(handler$, (prev, curr) => ({
      ...prev,
      statusCode: curr.statusCode,
      hasError: !curr.token,
      token: curr.token,
    }));

    this._state
      .select("token")
      .pipe(filter((x) => !!x))
      .subscribe({
        next: (token) => {
          this._authService.persistToken(token);
          this._router.navigate(["/dashboard"]);
        },
      });
  }

  ngOnInit(): void {
    this.initForm();
    this.manageEvents();
    this.connectState();
  }
}
