import { Routes } from "@angular/router";
import { UsersComponent } from "src/app/pages/users/users.component";
import { AuthorizedComponent } from "./authorized.component";

export const authorizedRoutes: Routes = [
  {
    path: "users",
    loadChildren: () =>
      import("../../pages/users/users.module").then((m) => m.UsersModule),
  },
];
