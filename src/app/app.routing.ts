import { Routes } from "@angular/router";
import { AuthGuard } from "./Guard/auth.guard";

import { FullComponent } from "./layouts/full/full.component";
import { LoginComponent } from "./layouts/unauthorized/login/login.component";

export const AppRoutes: Routes = [
  {
    path: "",
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full",
      },
      // {
      //   path: "",
      //   loadChildren: () =>
      //     import("./material-component/material.module").then(
      //       (m) => m.MaterialComponentsModule
      //     ),
      // },
      {
        path: "",
        loadChildren: () =>
          import("./layouts/authorized/authorized.module").then(
            (m) => m.AuthorizedModule
          ),
      },
      // {
      //   path: "users",
      //   loadChildren: () =>
      //     import("./pages/users/users.module").then((m) => m.UsersModule),
      // },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
    // loadChildren: () =>
    //   import("src/app/layouts/unauthorized/unauthorized.module").then(
    //     (m) => m.UnauthorizedModule
    //   ),
  },
];
