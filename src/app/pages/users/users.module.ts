import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutes } from "./users.routing";
import { RouterModule } from "@angular/router";
import { UserlistComponent } from "./userlist/userlist.component";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  declarations: [UserlistComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule.forChild(UserRoutes),
  ],
})
export class UsersModule {}
