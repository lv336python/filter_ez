import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PlotlyModule } from 'angular-plotly.js';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { FilterComponent } from './filter/filter.component';
import { FilterItemComponent } from './filter-item/filter-item.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogoutComponent } from './logout/logout.component';
import { ConfirmResetComponent } from './confirm-reset/confirm-reset.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TableComponent } from './table/table.component';
import { FileUploadsComponent } from './file-uploads/file-uploads.component';
import { AuthGuardService } from './auth.guard';
import { StatisticsComponent } from './statistics/statistics.component';
import { NotificationComponent } from './notification/notification.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserFilesComponent } from './user-data/user-files/user-files.component';
import { UserFiltersComponent } from './user-data/user-filters/user-filters.component';
import { UserDataSetsComponent } from './user-data/user-data-sets/user-data-sets.component';
import { UserFileComponent } from './user-data/user-files/user-file/user-file.component';
import { UserFilterComponent } from './user-data/user-filters/user-filter/user-filter.component';
import { UserDataSetComponent } from './user-data/user-data-sets/user-data-set/user-data-set.component';
import { UserDataService } from './_services/user-data.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NotfoundComponent,
    HomeComponent,
    ConfirmEmailComponent,
    LoginComponent,
    LogoutComponent,
    ResetPasswordComponent,
    ConfirmResetComponent,
    NavbarComponent,
    FileUploadsComponent,
    TableComponent,
    StatisticsComponent,
    NotificationComponent,
    FilterComponent,
    FilterItemComponent,
    UserDataComponent,
    UserFilesComponent,
    UserFiltersComponent,
    UserDataSetsComponent,
    UserFileComponent,
    UserFilterComponent,
    UserDataSetComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
      ReactiveFormsModule,
      PlotlyModule
  ],
  providers: [AuthGuardService, UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
