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
import { FileUploadSelectorComponent } from './upload-components/file-upload-selector/file-upload-selector.component';
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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EmailFileComponent } from './email-file/email-file.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FilterTreeComponent } from './filter-tree/filter-tree.component';
import { FileUploadConfirmComponent } from './upload-components/file-upload-confirm/file-upload-confirm.component';
import { FileUploadProcessComponent } from './upload-components/file-upload-process/file-upload-process.component';
import { ModalsComponent } from './_directives/modals.component';
import { FileUploadItemComponent } from './upload-components/file-upload-item/file-upload-item.component';
import {FileUploadService} from "./_services/file-upload.service";
import {ModalService} from "./_services/modal.service";
import { ProcessBarComponent } from './upload-components/process-bar/process-bar.component';
import {EventSharingService} from "./_services/event-sharing.service";
import { FilterPreviewComponent } from './filter-preview/filter-preview.component';
import { NgxSpinnerModule } from 'ngx-spinner';


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
    FileUploadSelectorComponent,
    TableComponent,
    StatisticsComponent,
    NotificationComponent,
    FilterComponent,
    FilterItemComponent,
    EmailFileComponent,
    UserDataComponent,
    UserFilesComponent,
    UserFiltersComponent,
    UserDataSetsComponent,
    UserFileComponent,
    UserFilterComponent,
    UserDataSetComponent,
    FilterTreeComponent,
    FileUploadConfirmComponent,
    FileUploadProcessComponent,
    ModalsComponent,
    FileUploadItemComponent,
    ProcessBarComponent,
    FilterPreviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
      ReactiveFormsModule,
      PlotlyModule,
      Ng2SearchPipeModule,
      PlotlyModule,
      BrowserAnimationsModule,
      NgxSpinnerModule

  ],
  providers: [AuthGuardService,
              UserDataService,
              FileUploadService,
              ModalService,
              EventSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
