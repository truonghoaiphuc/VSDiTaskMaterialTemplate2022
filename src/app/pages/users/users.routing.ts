import { Routes } from "@angular/router";
import { UserlistComponent } from "./userlist/userlist.component";
import { UsersComponent } from "./users.component";

export const UserRoutes: Routes = [
  {
    path: "",
    component: UserlistComponent,
  },
];
