(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_services/user-data.service.ts":
/*!************************************************!*\
  !*** ./src/app/_services/user-data.service.ts ***!
  \************************************************/
/*! exports provided: UserDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDataService", function() { return UserDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_add_observable_throw__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/add/observable/throw */ "./node_modules/rxjs-compat/_esm5/add/observable/throw.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserDataService = /** @class */ (function () {
    function UserDataService(http) {
        this.http = http;
    }
    UserDataService.prototype.getUserData = function () {
        return this.http
            .get('api/userdata')
            .catch(this.handleError);
    };
    UserDataService.prototype.getUserFiles = function (data) {
        return data.user_files;
    };
    UserDataService.prototype.getUserDataSets = function (data) {
        return data.user_datasets;
    };
    UserDataService.prototype.getUserFilters = function (data) {
        return data.user_filters;
    };
    UserDataService.prototype.handleError = function (error) {
        return rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"].throwError(error.message || 'Server Error');
    };
    UserDataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], UserDataService);
    return UserDataService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _notfound_notfound_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notfound/notfound.component */ "./src/app/notfound/notfound.component.ts");
/* harmony import */ var _registration_registration_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./registration/registration.component */ "./src/app/registration/registration.component.ts");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _confirm_email_confirm_email_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./confirm-email/confirm-email.component */ "./src/app/confirm-email/confirm-email.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _logout_logout_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./logout/logout.component */ "./src/app/logout/logout.component.ts");
/* harmony import */ var _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./reset-password/reset-password.component */ "./src/app/reset-password/reset-password.component.ts");
/* harmony import */ var _confirm_reset_confirm_reset_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./confirm-reset/confirm-reset.component */ "./src/app/confirm-reset/confirm-reset.component.ts");
/* harmony import */ var _user_data_user_data_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./user-data/user-data.component */ "./src/app/user-data/user-data.component.ts");
/* harmony import */ var _filter_tree_filter_tree_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./filter-tree/filter-tree.component */ "./src/app/filter-tree/filter-tree.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var routes = [
    { path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"], canActivate: [_auth_guard__WEBPACK_IMPORTED_MODULE_5__["AuthGuardService"]] },
    { path: 'register', component: _registration_registration_component__WEBPACK_IMPORTED_MODULE_4__["RegistrationComponent"] },
    { path: 'confirm/:token', component: _confirm_email_confirm_email_component__WEBPACK_IMPORTED_MODULE_6__["ConfirmEmailComponent"] },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"] },
    { path: 'logout', component: _logout_logout_component__WEBPACK_IMPORTED_MODULE_8__["LogoutComponent"] },
    { path: 'reset', component: _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_9__["ResetPasswordComponent"] },
    { path: 'reset_password_confirm/:token', component: _confirm_reset_confirm_reset_component__WEBPACK_IMPORTED_MODULE_10__["ConfirmResetComponent"] },
    { path: 'data', component: _user_data_user_data_component__WEBPACK_IMPORTED_MODULE_11__["UserDataComponent"] },
    { path: 'filter', component: _filter_tree_filter_tree_component__WEBPACK_IMPORTED_MODULE_12__["FilterTreeComponent"] },
    { path: '**', component: _notfound_notfound_component__WEBPACK_IMPORTED_MODULE_3__["NotfoundComponent"] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".navbar{\nbackground-color: rgb(22, 17, 17);\nborder-radius: 4px;\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<app-notification *ngIf=\"loggedIn != 'loggedOut'\"></app-notification>\n<router-outlet></router-outlet>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _event_emitter_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event-emitter.service */ "./src/app/event-emitter.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(auth, emitter) {
        this.auth = auth;
        this.emitter = emitter;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loggedIn = this.auth.isLogined();
        this.emitter.emitter.subscribe(function (res) {
            console.log(res + " Emitted");
            _this.loggedIn = res;
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"],
            _event_emitter_service__WEBPACK_IMPORTED_MODULE_2__["EventEmitterService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angular_plotly_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-plotly.js */ "./node_modules/angular-plotly.js/esm5/angular-plotly.js.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _registration_registration_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./registration/registration.component */ "./src/app/registration/registration.component.ts");
/* harmony import */ var _notfound_notfound_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./notfound/notfound.component */ "./src/app/notfound/notfound.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _confirm_email_confirm_email_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./confirm-email/confirm-email.component */ "./src/app/confirm-email/confirm-email.component.ts");
/* harmony import */ var _filter_filter_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./filter/filter.component */ "./src/app/filter/filter.component.ts");
/* harmony import */ var _filter_item_filter_item_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./filter-item/filter-item.component */ "./src/app/filter-item/filter-item.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./reset-password/reset-password.component */ "./src/app/reset-password/reset-password.component.ts");
/* harmony import */ var _logout_logout_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./logout/logout.component */ "./src/app/logout/logout.component.ts");
/* harmony import */ var _confirm_reset_confirm_reset_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./confirm-reset/confirm-reset.component */ "./src/app/confirm-reset/confirm-reset.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _table_table_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./table/table.component */ "./src/app/table/table.component.ts");
/* harmony import */ var _file_uploads_file_uploads_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./file-uploads/file-uploads.component */ "./src/app/file-uploads/file-uploads.component.ts");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _statistics_statistics_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./statistics/statistics.component */ "./src/app/statistics/statistics.component.ts");
/* harmony import */ var _notification_notification_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./notification/notification.component */ "./src/app/notification/notification.component.ts");
/* harmony import */ var _user_data_user_data_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./user-data/user-data.component */ "./src/app/user-data/user-data.component.ts");
/* harmony import */ var _user_data_user_files_user_files_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./user-data/user-files/user-files.component */ "./src/app/user-data/user-files/user-files.component.ts");
/* harmony import */ var _user_data_user_filters_user_filters_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./user-data/user-filters/user-filters.component */ "./src/app/user-data/user-filters/user-filters.component.ts");
/* harmony import */ var _user_data_user_data_sets_user_data_sets_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./user-data/user-data-sets/user-data-sets.component */ "./src/app/user-data/user-data-sets/user-data-sets.component.ts");
/* harmony import */ var _user_data_user_files_user_file_user_file_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./user-data/user-files/user-file/user-file.component */ "./src/app/user-data/user-files/user-file/user-file.component.ts");
/* harmony import */ var _user_data_user_filters_user_filter_user_filter_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./user-data/user-filters/user-filter/user-filter.component */ "./src/app/user-data/user-filters/user-filter/user-filter.component.ts");
/* harmony import */ var _user_data_user_data_sets_user_data_set_user_data_set_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./user-data/user-data-sets/user-data-set/user-data-set.component */ "./src/app/user-data/user-data-sets/user-data-set/user-data-set.component.ts");
/* harmony import */ var _services_user_data_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./_services/user-data.service */ "./src/app/_services/user-data.service.ts");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _email_file_email_file_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./email-file/email-file.component */ "./src/app/email-file/email-file.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _filter_tree_filter_tree_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./filter-tree/filter-tree.component */ "./src/app/filter-tree/filter-tree.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _registration_registration_component__WEBPACK_IMPORTED_MODULE_7__["RegistrationComponent"],
                _notfound_notfound_component__WEBPACK_IMPORTED_MODULE_8__["NotfoundComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_9__["HomeComponent"],
                _confirm_email_confirm_email_component__WEBPACK_IMPORTED_MODULE_10__["ConfirmEmailComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_13__["LoginComponent"],
                _logout_logout_component__WEBPACK_IMPORTED_MODULE_15__["LogoutComponent"],
                _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_14__["ResetPasswordComponent"],
                _confirm_reset_confirm_reset_component__WEBPACK_IMPORTED_MODULE_16__["ConfirmResetComponent"],
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_17__["NavbarComponent"],
                _file_uploads_file_uploads_component__WEBPACK_IMPORTED_MODULE_19__["FileUploadsComponent"],
                _table_table_component__WEBPACK_IMPORTED_MODULE_18__["TableComponent"],
                _statistics_statistics_component__WEBPACK_IMPORTED_MODULE_21__["StatisticsComponent"],
                _notification_notification_component__WEBPACK_IMPORTED_MODULE_22__["NotificationComponent"],
                _filter_filter_component__WEBPACK_IMPORTED_MODULE_11__["FilterComponent"],
                _filter_item_filter_item_component__WEBPACK_IMPORTED_MODULE_12__["FilterItemComponent"],
                _email_file_email_file_component__WEBPACK_IMPORTED_MODULE_32__["EmailFileComponent"],
                _user_data_user_data_component__WEBPACK_IMPORTED_MODULE_23__["UserDataComponent"],
                _user_data_user_files_user_files_component__WEBPACK_IMPORTED_MODULE_24__["UserFilesComponent"],
                _user_data_user_filters_user_filters_component__WEBPACK_IMPORTED_MODULE_25__["UserFiltersComponent"],
                _user_data_user_data_sets_user_data_sets_component__WEBPACK_IMPORTED_MODULE_26__["UserDataSetsComponent"],
                _user_data_user_files_user_file_user_file_component__WEBPACK_IMPORTED_MODULE_27__["UserFileComponent"],
                _user_data_user_filters_user_filter_user_filter_component__WEBPACK_IMPORTED_MODULE_28__["UserFilterComponent"],
                _user_data_user_data_sets_user_data_set_user_data_set_component__WEBPACK_IMPORTED_MODULE_29__["UserDataSetComponent"],
                _filter_tree_filter_tree_component__WEBPACK_IMPORTED_MODULE_34__["FilterTreeComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                angular_plotly_js__WEBPACK_IMPORTED_MODULE_4__["PlotlyModule"],
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_31__["Ng2SearchPipeModule"],
                angular_plotly_js__WEBPACK_IMPORTED_MODULE_4__["PlotlyModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_33__["BrowserAnimationsModule"]
            ],
            providers: [_auth_guard__WEBPACK_IMPORTED_MODULE_20__["AuthGuardService"], _services_user_data_service__WEBPACK_IMPORTED_MODULE_30__["UserDataService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth.guard.ts":
/*!*******************************!*\
  !*** ./src/app/auth.guard.ts ***!
  \*******************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(router) {
        this.router = router;
        this.returnUrl = '/login';
    }
    AuthGuardService.prototype.isLogined = function () {
        function getCookie(name) {
            var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }
        return getCookie("session");
    };
    AuthGuardService.prototype.canActivate = function (route, state) {
        if (this.isLogined()) {
            return true;
        }
        else {
            this.router.navigate([this.returnUrl], { queryParams: { authRedirecting: true } });
            return false;
        }
    };
    AuthGuardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuardService);
    return AuthGuardService;
}());



/***/ }),

/***/ "./src/app/auth.service.ts":
/*!*********************************!*\
  !*** ./src/app/auth.service.ts ***!
  \*********************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = /** @class */ (function () {
    function AuthService(_http) {
        this._http = _http;
        this.login_api_url = "api/login";
        this.register_api_url = "api/register";
        this.confirm_url = "api/confirm/";
        this.logout_api_url = "api/logout";
        this.reset_password_url = "api/reset";
        this.reset_password_confirm_api = "api/password_reset";
    }
    AuthService.prototype.toRegister = function (user) {
        return this._http.post(this.register_api_url, user)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (data) { return console.log(data); }, function (error) { return console.log(error); }));
    };
    AuthService.prototype.toLogin = function (user) {
        return this._http.post(this.login_api_url, user);
    };
    AuthService.prototype.toLogout = function (user) {
        return this._http.post(this.logout_api_url, user);
    };
    AuthService.prototype.toResetPassword = function (email) {
        return this._http.post(this.reset_password_url, { 'email': email });
    };
    AuthService.prototype.toResetPasswordConfirm = function (token, password) {
        return this._http.put(this.reset_password_confirm_api + '/' + token, { 'password': password });
    };
    AuthService.prototype.confirmEmail = function (token) {
        return this._http.get(this.confirm_url + token);
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/confirm-email/confirm-email.component.css":
/*!***********************************************************!*\
  !*** ./src/app/confirm-email/confirm-email.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/confirm-email/confirm-email.component.html":
/*!************************************************************!*\
  !*** ./src/app/confirm-email/confirm-email.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "  You have confirmed registration. Proceed to <a routerLink=\"\">home page</a>\n"

/***/ }),

/***/ "./src/app/confirm-email/confirm-email.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/confirm-email/confirm-email.component.ts ***!
  \**********************************************************/
/*! exports provided: ConfirmEmailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmEmailComponent", function() { return ConfirmEmailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConfirmEmailComponent = /** @class */ (function () {
    function ConfirmEmailComponent(auth, route, router) {
        this.auth = auth;
        this.route = route;
        this.router = router;
        this.returnUrl = '/login';
    }
    ConfirmEmailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.confirmEmail(this.route.snapshot.params["token"])
            .subscribe(function (res) { return _this.router.navigate([_this.returnUrl]); });
    };
    ConfirmEmailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-confirm-email',
            template: __webpack_require__(/*! ./confirm-email.component.html */ "./src/app/confirm-email/confirm-email.component.html"),
            styles: [__webpack_require__(/*! ./confirm-email.component.css */ "./src/app/confirm-email/confirm-email.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], ConfirmEmailComponent);
    return ConfirmEmailComponent;
}());



/***/ }),

/***/ "./src/app/confirm-reset/confirm-reset.component.css":
/*!***********************************************************!*\
  !*** ./src/app/confirm-reset/confirm-reset.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@media(min-width: 768px) {\n    .field-label-responsive {\n      padding-top: .5rem;\n      text-align: right;\n      \n    }\n\n  }"

/***/ }),

/***/ "./src/app/confirm-reset/confirm-reset.component.html":
/*!************************************************************!*\
  !*** ./src/app/confirm-reset/confirm-reset.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"auth\">\n    <div class=\"form\">\n        <form [formGroup]=\"resetPasswordGroup\" (ngSubmit)=\"toConfirmReset()\">\n            <div class=\"row\">\n                <div class=\"col-md-3\"></div>\n                <div class=\"col-md-6\">\n                    <h2>Register New User</h2>\n                    <hr>\n                    <br><br>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3 field-label-responsive\">\n                    <label for=\"password\"> New password</label>\n                </div>\n                <div class=\"col-md-6\">\n                    <div class=\"form-group has-danger\">\n                        <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\n                            <div class=\"input-group-addon\" style=\"width: 2.6rem\"><i class=\"fa fa-key\"></i></div>\n                            <input type=\"password\" formControlName=\"password\" class=\"form-control\" id=\"password\"\n                                   placeholder=\"Password\" required>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3 field-label-responsive\">\n                    <label for=\"password\">Confirm password</label>\n                </div>\n                <div class=\"col-md-6\">\n                    <div class=\"form-group has-danger\">\n                        <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\n                            <div class=\"input-group-addon\" style=\"width: 2.6rem\"><i class=\"fa fa-key\"></i></div>\n                            <input type=\"password\" formControlName=\"password_confirm\" class=\"form-control\"\n                                   id=\"password_confirm\"\n                                   placeholder=\"Password\" required>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3\"></div>\n                <div class=\"col-md-6\">\n                    <div class=\"alert alert-danger\" *ngIf=\"password.invalid && (password.dirty || password.touched)\">\n                        <ul>\n                            <li *ngIf=\"password.errors.minlength || password.errors.maxlength\">Password must be from 8\n                                to 40\n                                characters long\n                            </li>\n                            <li *ngIf=\"password.errors.wrongFormat\">Password must contain at least one digit</li>\n\n                        </ul>\n                    </div>\n                    <div class=\"alert alert-danger\"\n                         *ngIf=\"resetPasswordGroup.valid && password.value != password_confirm.value\">\n                        Passwords do not match\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3\"></div>\n                <div class=\"col-md-6\">\n                    <button class=\"btn btn-success\" type=\"submit\"\n                            [disabled]=\"!resetPasswordGroup.valid && password.value != password_confirm.value\">Submit\n                    </button>\n                </div>\n                <div class=\"col-md-3\"></div>\n            </div>\n\n        </form>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/confirm-reset/confirm-reset.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/confirm-reset/confirm-reset.component.ts ***!
  \**********************************************************/
/*! exports provided: ConfirmResetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmResetComponent", function() { return ConfirmResetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _directives_text_format_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../directives/text-format.directive */ "./src/app/directives/text-format.directive.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConfirmResetComponent = /** @class */ (function () {
    function ConfirmResetComponent(auth_, router, route) {
        this.auth_ = auth_;
        this.router = router;
        this.route = route;
        this.resetPasswordGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(8),
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(40),
                Object(_directives_text_format_directive__WEBPACK_IMPORTED_MODULE_2__["TextFormatDirective"])(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
            ]),
            password_confirm: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(8),
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(40),
                Object(_directives_text_format_directive__WEBPACK_IMPORTED_MODULE_2__["TextFormatDirective"])(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
            ])
        });
    }
    ConfirmResetComponent.prototype.toConfirmReset = function () {
        var _this = this;
        if (this.resetPasswordGroup.controls['password'].value ===
            this.resetPasswordGroup.controls['password_confirm'].value) {
            this.auth_.toResetPasswordConfirm(this.route.snapshot.params["token"], this.resetPasswordGroup.controls['password'].value).subscribe(function (res) {
                _this.router.navigate([_this.returnUrl]);
                _this.resetPasswordGroup.setValue({ email: '', password: '' });
            });
        }
    };
    Object.defineProperty(ConfirmResetComponent.prototype, "password", {
        get: function () {
            return this.resetPasswordGroup.get('password');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfirmResetComponent.prototype, "password_confirm", {
        get: function () {
            return this.resetPasswordGroup.get('password_confirm');
        },
        enumerable: true,
        configurable: true
    });
    ConfirmResetComponent.prototype.ngOnInit = function () {
        this.returnUrl = '/login';
    };
    ConfirmResetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-confirm-reset',
            template: __webpack_require__(/*! ./confirm-reset.component.html */ "./src/app/confirm-reset/confirm-reset.component.html"),
            styles: [__webpack_require__(/*! ./confirm-reset.component.css */ "./src/app/confirm-reset/confirm-reset.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], ConfirmResetComponent);
    return ConfirmResetComponent;
}());



/***/ }),

/***/ "./src/app/data.service.ts":
/*!*********************************!*\
  !*** ./src/app/data.service.ts ***!
  \*********************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DataService = /** @class */ (function () {
    function DataService(_http) {
        this._http = _http;
        this.get_statistics_url = 'api/statistics/';
        this.get_rows_url = 'api/get_rows/';
        this.send_dataset_on_email = 'api/send_file/';
    }
    DataService.prototype.get = function () {
        return this._http.get('test');
    };
    DataService.prototype.getStatistics = function (dataset_id) {
        return this._http.get(this.get_statistics_url + dataset_id);
    };
    DataService.prototype.getRows = function (dataset_id, number_of_rows) {
        return this._http.get(this.get_rows_url + dataset_id + '/' + number_of_rows);
    };
    DataService.prototype.sendFile = function (dataset_id, emails) {
        return this._http.post(this.send_dataset_on_email + dataset_id, { 'emails': emails });
    };
    DataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/directives/text-format.directive.ts":
/*!*****************************************************!*\
  !*** ./src/app/directives/text-format.directive.ts ***!
  \*****************************************************/
/*! exports provided: TextFormatDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextFormatDirective", function() { return TextFormatDirective; });
function TextFormatDirective(nameRe) {
    return function (control) {
        var correct = nameRe.test(control.value);
        return correct ? null : { 'wrongFormat': { value: control.value } };
    };
}


/***/ }),

/***/ "./src/app/email-file/email-file.component.css":
/*!*****************************************************!*\
  !*** ./src/app/email-file/email-file.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.correct-email {\n    background-color: rgba(68, 128, 18, 0.79);\n}\n\n.wrong-email {\n    background-color: rgb(255, 153, 122);\n}\n\n.empty-email {\n    background-color: #fdfffc;\n}\n\n.send-to-email {\n   background-color: rgba(236, 235, 231, 0.99);\n    width: 50%;\n    display: inline;\n    float: left;\nborder-radius: 10px;\n\n\n}\n\n.left-part {\n    float: left;\n    width: 55%;\n    z-index: 200;\n    min-height: 100%;\n}\n\n.list {\n    padding-top: 2%;\n    padding-left: 2%;\n    padding-right: 2%;\n    min-height: 70%;\n    max-height: 70%;\n}\n\n.warning-list {\n    padding-left: 2%;\n    height: 20%;\n    min-height: 40px;\n    max-height: 40px;\n}\n\n.email-field {\n    border-top-right-radius: 0px;\n    border-bottom-right-radius: 0px;\n    display: inline;\n    position: relative;\n    z-index: 10;\n    width: 90%;\n    height: 30px;\n}\n\n.email-input-group {\n    margin-top: 5px;\n}\n\n.remove-button {\n    border-top-left-radius: 0px;\n    border-bottom-left-radius: 0px;\n    margin-bottom: 2px;\n    position: relative;\n    z-index: 10;\n    width: 10%;\n    height: 30px;\n     background-color: rgba(41, 41, 42, 0.54);\n    padding: 0px;\n}\n\n.menu {\n    background-color: rgba(9, 20, 31, 0.96);\n    padding-top: 8%;\n    padding-bottom: 8%;\n    margin-left: auto;\n    margin-right: 0;\n    text-align:center;\n    width: 40%;\n    min-height:120%;\n\n    display: block;\n    border-radius: 0px 10px 10px 0px;\n\n}\n\n.menu button{\n    margin: auto;\n    width: 50%;\n    display: block;\n    margin-bottom: 9px;\n    background-color: rgba(246, 245, 241, 0.87);\n    }\n\n.send-to-email button:hover {\n    background-color: rgba(179, 178, 176, 0.99);\n}\n\n\n"

/***/ }),

/***/ "./src/app/email-file/email-file.component.html":
/*!******************************************************!*\
  !*** ./src/app/email-file/email-file.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"send-to-email\">\n    <div class=\"left-part\">\n        <div class=\"list\">\n            <div class=\"email-input-group\" *ngFor='let index of address_indexes; let i = index' [@fieldAppear]>\n                <input [ngClass]=\"{\n                            'correct-email' : isValidEmail(addresses[i]),\n                            'wrong-email' : !isValidEmail(addresses[i]),\n                            'empty-email' : addresses[i].trim() == ''\n                        }\"\n                       [(ngModel)]=\"addresses[i]\"\n                       class=\"form-control email-field\">\n                <button class=\"btn btn-default remove-button\" (click)=\"removeField(i)\">-</button>\n            </div>\n\n        </div>\n        <div class=\"warning-list\">\n            <p *ngIf=\"cantCreateMessage\" [@warnignAppear] class=\"warning\">\n                    Wrong value in previous field. Can't create new\n            </p>\n            <p *ngIf=\"maxNumberOfFields\" [@warnignAppear] class=\"warning\">\n                Max number of fields\n            </p>\n            <p *ngIf=\"cantSendMessage && addresses.length > 1\" [@warnignAppear] class=\"warning\">\n                Can't send mail to these addresses\n            </p>\n            <p *ngIf=\"cantSendMessage && addresses.length == 1\" [@warnignAppear] class=\"warning\">\n                Can't send mail to this address\n            </p>\n            <p *ngIf=\"cantSendMessage && addresses.length == 0\" [@warnignAppear] class=\"warning\">\n                Add address to send the result\n            </p>\n        </div>\n    </div>\n    <div class=\"menu\">\n        <button (click)=\"addField()\" class=\"btn btn-default\">Add field</button>\n        <button (click)=\"sendResult()\" class=\"btn btn-default\">Send</button>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/email-file/email-file.component.ts":
/*!****************************************************!*\
  !*** ./src/app/email-file/email-file.component.ts ***!
  \****************************************************/
/*! exports provided: EmailFileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailFileComponent", function() { return EmailFileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data.service */ "./src/app/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EmailFileComponent = /** @class */ (function () {
    function EmailFileComponent(data_service) {
        this.data_service = data_service;
        this.addresses = [''];
        this.address_indexes = [0];
        this.cantCreateMessage = false;
        this.maxNumberOfFields = false;
        this.cantSendMessage = false;
    }
    Object.defineProperty(EmailFileComponent.prototype, "dataset_id", {
        get: function () {
            return this.dataset_id_;
        },
        set: function (dataset_id) {
            this.dataset_id_ = dataset_id;
        },
        enumerable: true,
        configurable: true
    });
    EmailFileComponent.prototype.ngOnInit = function () {
    };
    EmailFileComponent.prototype.isValidEmail = function (email) {
        var validate_expression = /^[a-zA-Z0-9]+[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
        if (validate_expression.test(email)) {
            return true;
        }
        return false;
    };
    EmailFileComponent.prototype.addField = function () {
        var _this = this;
        // No more than 5 fields for email input
        if (this.addresses.length == 5) {
            this.maxNumberOfFields = true;
            setTimeout(function () { _this.maxNumberOfFields = false; }, 3000);
            return undefined;
        }
        // If any of the addresses is not valid and is not empty
        // can't create a new field for an email.
        if (this.addresses.some(function (addr) { return !_this.isValidEmail(addr) && addr.trim() != ''; })) {
            this.cantCreateMessage = true;
            setTimeout(function () { _this.cantCreateMessage = false; }, 3000);
        }
        else {
            this.addresses.push('');
            this.address_indexes.push(this.addresses.length - 1);
        }
    };
    EmailFileComponent.prototype.removeField = function (index) {
        //Closes all messages and removes records about the field being removed from
        //array of addresses and email_ids
        this.cantCreateMessage = false;
        this.cantSendMessage = false;
        this.maxNumberOfFields = false;
        this.addresses.splice(index, 1);
        this.address_indexes.pop();
    };
    EmailFileComponent.prototype.sendResult = function () {
        var _this = this;
        this.cantCreateMessage = false;
        this.maxNumberOfFields = false;
        if (this.addresses.some(function (val) { return !_this.isValidEmail(val); }) || this.addresses.length == 0) {
            this.cantSendMessage = true;
            setTimeout(function () { _this.cantSendMessage = false; }, 3000);
        }
        else {
            this.data_service.sendFile(this.dataset_id_, this.addresses)
                .subscribe(function (res) { return console.log("File sent successfully"); }, function (error) { return console.error(error); });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], EmailFileComponent.prototype, "dataset_id", null);
    EmailFileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-email-file',
            template: __webpack_require__(/*! ./email-file.component.html */ "./src/app/email-file/email-file.component.html"),
            styles: [__webpack_require__(/*! ./email-file.component.css */ "./src/app/email-file/email-file.component.css")],
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('warnignAppear', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('void => *', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(-90%)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(400)
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => void', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(400, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(-90%)' }))
                    ])
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('fieldAppear', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('void => *', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(-15%)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(100)
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => void', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(100, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateY(-15%)' }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"]])
    ], EmailFileComponent);
    return EmailFileComponent;
}());



/***/ }),

/***/ "./src/app/event-emitter.service.ts":
/*!******************************************!*\
  !*** ./src/app/event-emitter.service.ts ***!
  \******************************************/
/*! exports provided: EventEmitterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventEmitterService", function() { return EventEmitterService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EventEmitterService = /** @class */ (function () {
    function EventEmitterService() {
        this.emitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    EventEmitterService.prototype.sendMessage = function (message) {
        this.emitter.emit(message);
    };
    EventEmitterService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], EventEmitterService);
    return EventEmitterService;
}());



/***/ }),

/***/ "./src/app/file-uploads/file-uploads.component.css":
/*!*********************************************************!*\
  !*** ./src/app/file-uploads/file-uploads.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/file-uploads/file-uploads.component.html":
/*!**********************************************************!*\
  !*** ./src/app/file-uploads/file-uploads.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"custom-file\">\n    <input type=\"file\" (change)=\"onFileSelected($event)\" class=\"custom-file\">\n    <button type=\"button\" (click)=\"onUpload()\">Upload</button>\n</div>"

/***/ }),

/***/ "./src/app/file-uploads/file-uploads.component.ts":
/*!********************************************************!*\
  !*** ./src/app/file-uploads/file-uploads.component.ts ***!
  \********************************************************/
/*! exports provided: FileUploadsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileUploadsComponent", function() { return FileUploadsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FileUploadsComponent = /** @class */ (function () {
    function FileUploadsComponent(http) {
        this.http = http;
        this.selectedFile = null;
        this.fileUploaded = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    FileUploadsComponent.prototype.onFileSelected = function (event) {
        this.selectedFile = event.target.files[0];
    };
    FileUploadsComponent.prototype.onUpload = function () {
        var _this = this;
        var filedata = new FormData();
        filedata.append('upload_file', this.selectedFile, this.selectedFile.name);
        this.http.post('api/upload', filedata)
            .subscribe(function (res) {
            console.log(res);
            _this.fileUploaded.emit(res['result'][2]);
        });
    };
    FileUploadsComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], FileUploadsComponent.prototype, "fileUploaded", void 0);
    FileUploadsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-file-uploads',
            template: __webpack_require__(/*! ./file-uploads.component.html */ "./src/app/file-uploads/file-uploads.component.html"),
            styles: [__webpack_require__(/*! ./file-uploads.component.css */ "./src/app/file-uploads/file-uploads.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], FileUploadsComponent);
    return FileUploadsComponent;
}());



/***/ }),

/***/ "./src/app/filter-item/filter-item.component.css":
/*!*******************************************************!*\
  !*** ./src/app/filter-item/filter-item.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n    border-color: dodgerblue;\n}\n\n.button-group {\n    display: flex;\n    justify-content: space-evenly;\n}\n\n.operator-button {\n    margin-top: 20px;\n    display: flex;\n    justify-content: space-evenly;\n}\n\n.row-padding {\n    margin-bottom: 20px;\n    position: relative;\n}\n\n.ribbon {\n    position: absolute;\n    top: 0;\n    right: 0;\n}\n\n.span-width {\n    width: 100%;\n}\n\n.quantity-group {\n    margin-left: 8.4%;\n    width: 100%;\n}\n\n.button-justify {\n    margin-top: 5px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-around;\n}"

/***/ }),

/***/ "./src/app/filter-item/filter-item.component.html":
/*!********************************************************!*\
  !*** ./src/app/filter-item/filter-item.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"form-row col-md-12\">\n        <div class=\"col-md-4\">\n            <select class=\"form-control\" *ngIf=\"!column && !disColumn; else disableColumn\"\n                    (change)=\"selectedColumnName($event.target.value)\">\n                <option value=\"\" disabled selected>Chose column</option>\n                <option *ngFor=\"let row of columns\">\n                    {{ row }}\n                </option>\n            </select>\n            <ng-template #disableColumn>\n                <select class=\"form-control\" disabled>\n                    <option value=\"\" selected>{{ column }}</option>\n                </select>\n            </ng-template>\n        </div>\n        <div class=\"button-group col-md-2\" *ngIf=\"column && !operator\">\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"addOperator('==')\">=</button>\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"addOperator('!=')\">!=</button>\n            <button type=\"button\" *ngIf=\"valueMaxMin.max\" class=\"btn btn-primary btn-sm\" (click)=\"addOperator('<')\"><\n            </button>\n            <button type=\"button\" *ngIf=\"valueMaxMin.max\" class=\"btn btn-primary btn-sm\" (click)=\"addOperator('>')\">>\n            </button>\n        </div>\n        <div class=\"button-group col-md-1\" *ngIf=\"column && operator\">\n            <button type=\"button\" class=\"btn btn-primary btn-sm\">{{ operator }}</button>\n        </div>\n        <div class=\"col-md-5\">\n            <select class=\"form-control\" *ngIf=\"operator && !valueMaxMin.max && !disValue\"\n                    (change)=\"addValue($event.target.value)\"\n                    [disabled]=\"disValue\">\n                <option value=\"\" disabled selected>Chose value</option>\n                <option *ngFor=\"let row of values\">\n                    {{ row }}\n                </option>\n            </select>\n            <input *ngIf=\"operator && valueMaxMin.max && !disValue\" type=\"number\"\n                   name=\"range_value\"\n                   [ngModel]=\"rangeValue\"\n                   (ngModelChange)=\"setRangeValue($event)\"\n                   [className]=\"rangeValueError ? 'form-control input-item  is-invalid' : 'form-control input-item'\"\n                   placeholder=\"Min: {{ valueMaxMin.min }} Max: {{ valueMaxMin.max }}\">\n            <div class=\"invalid-feedback\">\n                                {{ rangeValueError }}\n            </div>\n            <select class=\"form-control\" *ngIf=\"operator && value && disValue\" [disabled]=\"disValue\">\n                <option value=\"\" disabled selected>{{ value }}</option>\n            </select>\n        </div>\n    </div>\n</div>\n<div class=\"row\" *ngIf=\"count_rows\">\n    <div class=\"form-row col-md-12\">\n        <div class=\"col-md-4\">\n            <span class=\"btn btn-success span-width\">{{ count_rows + ' / ' + totalRows }}</span>\n        </div>\n        <div class=\"col-md-5 quantity-group input-group\">\n            <input type=\"number\" name=\"user_quantity\" [ngModel]=\"quantity\"\n                   (ngModelChange)=\"setQuantity($event)\"\n                   [className]=\"valid_quantity ? 'form-control' : 'form-control is-invalid'\"\n                   placeholder=\"Max {{ maxPercentageForUser }}\"\n                   [readonly]=\"qtt_readonly\"\n            >\n            <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\">%</span>\n            </div>\n            <div class=\"invalid-feedback\">\n                {{ quantityError }}\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"row\">\n    <div *ngIf=\"quantity && !qtt_readonly && !parent_id && !child_id\" class=\"col-md-9 button-justify\">\n        <button type=\"button\" class=\"btn btn-info\" (click)=\"addNewColumn()\">Add Column</button>\n        <button type=\"button\" *ngIf=\"!parent_id\" class=\"btn btn-info\" (click)=\"saveParent()\">Save</button>\n    </div>\n    <div *ngIf=\"quantity && !qtt_readonly && parent_id && !child_id\" class=\"col-md-9 button-justify\">\n        <button type=\"button\" class=\"btn btn-info\" (click)=\"addChild(parent_id)\">Add Child</button>\n        <button type=\"button\" *ngIf=\"parent_id\" class=\"btn btn-info\" (click)=\"saveChild()\">Save</button>\n    </div>\n    <div *ngIf=\"quantity && !qtt_readonly && parent_id && child_id\" class=\"col-md-9 button-justify\">\n        <button type=\"button\" class=\"btn btn-info\" (click)=\"addLastChild(parent_id, child_id)\">Add New</button>\n        <button type=\"button\" *ngIf=\"parent_id\" class=\"btn btn-info\" (click)=\"saveLastChild()\">Save</button>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/filter-item/filter-item.component.ts":
/*!******************************************************!*\
  !*** ./src/app/filter-item/filter-item.component.ts ***!
  \******************************************************/
/*! exports provided: FilterItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterItemComponent", function() { return FilterItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FilterItemComponent = /** @class */ (function () {
    function FilterItemComponent(http) {
        this.http = http;
        this.operatorBtwElem = '';
        this.valid_quantity = true;
        this.maxPercentageForUser = 100;
        this.new_column = true;
        this.param_index = 0;
        this.qtt_readonly = false;
        this.disColumn = false;
        this.disValue = false;
        this.disQuantity = false;
        this.valuesPushed = false;
        this.valueMaxMin = {};
        this.values = [];
        // @Output() addFilterElem: EventEmitter<any> = new EventEmitter<any>();
        this.updateFilterItemParams = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    FilterItemComponent.prototype.ngOnInit = function () {
        if (this.child == 'first') {
            if (this.f_param[this.parent_id]['child'][this.f_index]['params']['column']) {
                this.selectedColumnName(this.f_param[this.parent_id]['child'][this.f_index]['params']['column']);
                this.disColumn = true;
            }
            this.operator = this.f_param[this.parent_id]['child'][this.f_index]['params']['operator'] ? this.f_param[this.parent_id]['child'][this.f_index]['params']['operator'] : '';
            if (this.f_param[this.parent_id]['child'][this.f_index]['params']['value']) {
                this.value = this.f_param[this.parent_id]['child'][this.f_index]['params']['value'];
                this.disValue = true;
            }
            this.parseSettings(this.f_param[this.parent_id]['child'][this.f_index]['settings']);
        }
        else if (this.child == 'last') {
            if (this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index]['params']['column']) {
                this.selectedColumnName(this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index]['params']['column']);
                this.disColumn = true;
            }
            this.operator = this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index]['params']['operator'] ? this.f_param[this.parent_id]['child'][this.f_index]['params']['operator'] : '';
            if (this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index]['params']['value']) {
                this.value = this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index]['params']['value'];
                this.disValue = true;
            }
            this.parseSettings(this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index]['settings']);
        }
        else {
            if (this.f_param[this.f_index]['params']['column']) {
                this.selectedColumnName(this.f_param[this.f_index]['params']['column']);
                this.disColumn = true;
            }
            this.operator = this.f_param[this.f_index]['params']['operator'] ? this.f_param[this.f_index]['params']['operator'] : '';
            if (this.f_param[this.f_index]['params']['value']) {
                this.value = this.f_param[this.f_index]['params']['value'];
                this.disValue = true;
            }
            this.parseSettings(this.f_param[this.f_index]['settings']);
        }
    };
    // save() {
    //     if (!this.checkQuantity()) {
    //         return false;
    //     }
    //     if (!this.valuesPushed) {
    //         this.pushFilterParams.emit({
    //             'column': this.column,
    //             'operator': this.operator,
    //             'value': this.value,
    //             'quantity': this.calculateQuantity(),
    //         });
    //     }
    //     this.valuesPushed = true;
    //     this.saveFilter.emit();
    // }
    FilterItemComponent.prototype.selectedColumnName = function (column) {
        this.column = column;
        this.value = '';
        if ('min' in this.metadata[column] && 'max' in this.metadata[column]) {
            this.valueMaxMin = {
                'min': this.metadata[column]['min'],
                'max': this.metadata[column]['max']
            };
        }
        else {
            this.values = this.metadata[column];
            this.valueMaxMin = {};
        }
    };
    FilterItemComponent.prototype.setQuantity = function (quantity) {
        this.quantity = quantity;
    };
    FilterItemComponent.prototype.addValue = function (value) {
        var _this = this;
        this.disColumn = true;
        this.value = value;
        if (this.parent_id && !this.child_id) {
            this.f_param[this.parent_id]['child'][this.f_index].params = {
                'column': this.column,
                'operator': this.operator,
                'value': this.value
            };
            var child_params = [
                this.f_param[this.parent_id].params,
                this.f_param[this.parent_id]['child'][this.f_index].params
            ];
            this.http
                .post('/api/count_rows', { 'file_id': this.file_id, 'params': child_params })
                .subscribe(function (res) { return _this.setCountRows(res); }, function (error) {
                console.log(error);
            });
        }
        else if (this.parent_id && this.child_id) {
            this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index].params = {
                'column': this.column,
                'operator': this.operator,
                'value': this.value
            };
            var last_child_params = [
                this.f_param[this.parent_id].params,
                this.f_param[this.parent_id]['child'][this.child_id].params,
                this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index].params,
            ];
            this.http
                .post('/api/count_rows', { 'file_id': this.file_id, 'params': last_child_params })
                .subscribe(function (res) { return _this.setCountRows(res); }, function (error) {
                console.log(error);
            });
        }
        else {
            this.f_param[this.f_index].params = {
                'column': this.column,
                'operator': this.operator,
                'value': this.value
            };
            this.http
                .post('/api/count_rows', { 'file_id': this.file_id, 'params': this.f_param[this.f_index].params })
                .subscribe(function (res) { return _this.setCountRows(res); }, function (error) {
                console.log(error);
            });
        }
    };
    FilterItemComponent.prototype.addOperator = function (oper) {
        this.operator = oper;
    };
    // operatorElems(data) {
    //     this.disValue = true;
    //     this.operatorBtwElem = data;
    // }
    FilterItemComponent.prototype.setPercentage = function () {
        if (this.totalRows != 0) {
            this.maxPercentageForUser = +(this.count_rows * 100 / this.totalRows).toFixed(2);
        }
        else {
            this.maxPercentageForUser = 100;
        }
    };
    FilterItemComponent.prototype.setCountRows = function (data) {
        this.count_rows = data;
        this.setPercentage();
    };
    FilterItemComponent.prototype.calculateQuantity = function () {
        return Math.floor(this.totalRows * this.quantity / 100);
    };
    FilterItemComponent.prototype.checkQuantity = function () {
        if (!this.quantity) {
            this.valid_quantity = false;
            this.quantityError = 'This field is required';
            return false;
        }
        else if (this.quantity > this.maxPercentageForUser) {
            this.quantityError = "This value can't be greater then " + this.maxPercentageForUser;
            this.valid_quantity = false;
            return false;
        }
        return true;
    };
    FilterItemComponent.prototype.setRangeValue = function (data) {
        this.value = data;
        if (this.checkRangeValue()) {
            this.rangeValueError = '';
            this.addValue(data);
        }
    };
    FilterItemComponent.prototype.checkRangeValue = function () {
        if ('max' in this.valueMaxMin) {
            if (this.value > this.valueMaxMin['max'] || this.value < this.valueMaxMin['min']) {
                this.rangeValueError = "This value should be in range between " + this.valueMaxMin['min'] + ' and ' + this.valueMaxMin['max'];
                return false;
            }
        }
        return true;
    };
    FilterItemComponent.prototype.addNewColumn = function () {
        if (!this.checkQuantity()) {
            return false;
        }
        if (!this.checkRangeValue()) {
            return false;
        }
        if (this.rangeValue) {
            this.value = this.rangeValue.toString();
        }
        this.f_param[this.f_index]['params'] = {
            'column': this.column,
            'operator': this.operator,
            'value': this.value,
            'quantity': this.calculateQuantity(),
        };
        this.f_param[this.f_index]['settings'] = {
            'count_rows': this.count_rows,
            'quantity': this.quantity,
            'qtt_readonly': true,
        };
        var new_index = Object.keys(this.f_param).length;
        this.f_param[new_index] = {
            'params': {
                'column': this.column,
            },
            'child': false,
        };
        this.updateFilterItemParams.emit(this.f_param);
    };
    FilterItemComponent.prototype.parseSettings = function (data) {
        if (data) {
            this.count_rows = data['count_rows'];
            this.quantity = data['quantity'];
            this.qtt_readonly = data['qtt_readonly'];
        }
    };
    FilterItemComponent.prototype.addChild = function (parentIndex) {
        if (!this.checkQuantity()) {
            return false;
        }
        if (!this.checkRangeValue()) {
            return false;
        }
        if (this.rangeValue) {
            this.value = this.rangeValue.toString();
        }
        this.f_param[this.parent_id]['child'][this.f_index]['params'] = {
            'column': this.column,
            'operator': this.operator,
            'value': this.value,
            'quantity': this.calculateQuantity(),
        };
        this.f_param[this.parent_id]['child'][this.f_index]['parent_id'] = this.parent_id;
        this.f_param[this.parent_id]['child'][this.f_index]['child'] = false;
        this.f_param[this.parent_id]['child'][this.f_index]['settings'] = {
            'count_rows': this.count_rows,
            'quantity': this.quantity,
            'qtt_readonly': true,
        };
        var new_child_index = Object.keys(this.f_param[parentIndex]['child']).length;
        this.f_param[parentIndex]['child'][new_child_index] = {
            'params': {
                'column': this.column
            },
            'child': false,
            'parent_id': parentIndex,
            'settings': {
                'count_rows': '',
                'quantity': '',
                'qtt_readonly': ''
            }
        };
        this.updateFilterItemParams.emit(this.f_param);
    };
    FilterItemComponent.prototype.saveParent = function () {
        if (!this.checkQuantity()) {
            return false;
        }
        if (!this.checkRangeValue()) {
            return false;
        }
        if (this.rangeValue) {
            this.value = this.rangeValue.toString();
        }
        this.f_param[this.f_index] = {};
        this.updateFilterItemParams.emit(this.f_param);
        this.f_param[this.f_index]['params'] = {
            'column': this.column,
            'operator': this.operator,
            'value': this.value,
            'quantity': this.calculateQuantity(),
        };
        this.f_param[this.f_index]['settings'] = {
            'count_rows': this.count_rows,
            'quantity': this.quantity,
            'qtt_readonly': true,
        };
        this.updateFilterItemParams.emit(this.f_param);
    };
    FilterItemComponent.prototype.saveChild = function () {
        if (!this.checkQuantity()) {
            return false;
        }
        if (!this.checkRangeValue()) {
            return false;
        }
        if (this.rangeValue) {
            this.value = this.rangeValue.toString();
        }
        this.f_param[this.parent_id]['child'][this.f_index] = {};
        this.updateFilterItemParams.emit(this.f_param);
        this.f_param[this.parent_id]['child'][this.f_index]['params'] = {
            'column': this.column,
            'operator': this.operator,
            'value': this.value,
            'quantity': this.calculateQuantity(),
        };
        this.f_param[this.parent_id]['child'][this.f_index]['parent_id'] = this.parent_id;
        this.f_param[this.parent_id]['child'][this.f_index]['child'] = false;
        this.f_param[this.parent_id]['child'][this.f_index]['settings'] = {
            'count_rows': this.count_rows,
            'quantity': this.quantity,
            'qtt_readonly': true,
        };
        this.updateFilterItemParams.emit(this.f_param);
    };
    FilterItemComponent.prototype.addLastChild = function (parent_id, child_id) {
        if (!this.checkQuantity()) {
            return false;
        }
        if (!this.checkRangeValue()) {
            return false;
        }
        if (this.rangeValue) {
            this.value = this.rangeValue.toString();
        }
        this.f_param[this.parent_id]['child'][child_id]['child'][this.f_index]['params'] = {
            'column': this.column,
            'operator': this.operator,
            'value': this.value,
            'quantity': this.calculateQuantity(),
        };
        this.f_param[this.parent_id]['child'][child_id]['child'][this.f_index]['parent_id'] = this.parent_id;
        this.f_param[this.parent_id]['child'][child_id]['child'][this.f_index]['child'] = false;
        this.f_param[this.parent_id]['child'][child_id]['child'][this.f_index]['child_id'] = child_id;
        this.f_param[this.parent_id]['child'][child_id]['child'][this.f_index]['settings'] = {
            'count_rows': this.count_rows,
            'quantity': this.quantity,
            'qtt_readonly': true,
        };
        var last_index = Object.keys(this.f_param[this.parent_id]['child'][child_id]['child']).length;
        this.f_param[this.parent_id]['child'][child_id]['child'][last_index] = {
            'params': {
                'column': this.column
            },
            'child': false,
            'parent_id': parent_id,
            'child_id': child_id,
            'settings': {
                'count_rows': '',
                'quantity': '',
                'qtt_readonly': ''
            }
        };
        this.updateFilterItemParams.emit(this.f_param);
    };
    FilterItemComponent.prototype.saveLastChild = function () {
        if (!this.checkQuantity()) {
            return false;
        }
        if (!this.checkRangeValue()) {
            return false;
        }
        if (this.rangeValue) {
            this.value = this.rangeValue.toString();
        }
        this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index] = {};
        this.updateFilterItemParams.emit(this.f_param);
        this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index]['params'] = {
            'column': this.column,
            'operator': this.operator,
            'value': this.value,
            'quantity': this.calculateQuantity(),
        };
        this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index]['parent_id'] = this.parent_id;
        this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index]['child'] = false;
        this.f_param[this.parent_id]['child'][this.child_id]['child'][this.f_index]['settings'] = {
            'count_rows': this.count_rows,
            'quantity': this.quantity,
            'qtt_readonly': true,
        };
        this.updateFilterItemParams.emit(this.f_param);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], FilterItemComponent.prototype, "updateFilterItemParams", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], FilterItemComponent.prototype, "columns", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FilterItemComponent.prototype, "metadata", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FilterItemComponent.prototype, "f_param", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], FilterItemComponent.prototype, "f_index", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], FilterItemComponent.prototype, "file_id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], FilterItemComponent.prototype, "totalRows", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], FilterItemComponent.prototype, "child", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], FilterItemComponent.prototype, "parent_id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], FilterItemComponent.prototype, "child_id", void 0);
    FilterItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'filter-item',
            template: __webpack_require__(/*! ./filter-item.component.html */ "./src/app/filter-item/filter-item.component.html"),
            styles: [__webpack_require__(/*! ./filter-item.component.css */ "./src/app/filter-item/filter-item.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], FilterItemComponent);
    return FilterItemComponent;
}());



/***/ }),

/***/ "./src/app/filter-tree/filter-tree.component.css":
/*!*******************************************************!*\
  !*** ./src/app/filter-tree/filter-tree.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".per30{\n    width: 33%;\n}"

/***/ }),

/***/ "./src/app/filter-tree/filter-tree.component.html":
/*!********************************************************!*\
  !*** ./src/app/filter-tree/filter-tree.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n    <div class=\"row justify-content-md-center\">\n        <div class=\"col col-md-auto\">\n            <h2 class=\"display-4\">Filtering data section</h2>\n            <select class=\"form-control\" (change)=\"selectFile($event.target.value)\">\n                <option value=\"\" disabled selected>Chose file</option>\n                <option *ngFor=\"let file of files\" value=\"{{ file[0] }}\">\n                    {{ file[1] }}\n                </option>\n            </select>\n            <hr class=\"my-4\">\n            <input type=\"text\" placeholder=\"Filter name\"\n                   [className]=\"valid_filter_name ? 'form-control' : 'form-control is-invalid'\"\n                   [ngModel]=\"filter_name\"\n                   (ngModelChange)=\"setFilterName($event)\"\n            >\n        </div>\n    </div>\n</div>\n<table class=\"table table-hover\">\n    <tbody>\n    <tr *ngFor=\"let index of  filter_params | keyvalue\">\n        <td class=\"per30\">\n            <filter-item\n                    [columns]=\"columns\"\n                    [f_index]=\"index.key\"\n                    [file_id]=\"file_id\"\n                    [child]=\"false\"\n                    [parent_id]=\"false\"\n                    [child_id]=\"false\"\n                    [totalRows]=\"totalRows\"\n                    [metadata]=\"metadata\"\n                    [f_param]=\"filter_params\"\n                    (updateFilterItemParams)=\"updateFilterParams($event)\"\n            ></filter-item>\n        </td>\n        <td>\n            <table *ngIf=\"index.value.child; else chl\" class=\"table table-hover\">\n                <tr *ngFor=\"let ch_index of  index.value.child | keyvalue\">\n                    <td>\n                        <filter-item\n                                [columns]=\"columns\"\n                                [f_index]=\"ch_index.key\"\n                                [file_id]=\"file_id\"\n                                [child]=\"'first'\"\n                                [parent_id]=\"index.key\"\n                                [child_id]=\"false\"\n                                [totalRows]=\"index.value.params.quantity\"\n                                [metadata]=\"metadata\"\n                                [f_param]=\"filter_params\"\n                                (updateFilterItemParams)=\"updateFilterParams($event)\"\n                        ></filter-item>\n                    </td>\n                    <td>\n                        <table *ngIf=\"ch_index.value.child; else last_child\" class=\"table table-hover\">\n                            <tr *ngFor=\"let ls_ch_index of  ch_index.value.child | keyvalue\">\n                                <td>\n                                    <filter-item\n                                            [columns]=\"columns\"\n                                            [f_index]=\"ls_ch_index.key\"\n                                            [file_id]=\"file_id\"\n                                            [child]=\"'last'\"\n                                            [parent_id]=\"index.key\"\n                                            [child_id]=\"ch_index.key\"\n                                            [totalRows]=\"ch_index.value.params.quantity\"\n                                            [metadata]=\"metadata\"\n                                            [f_param]=\"filter_params\"\n                                            (updateFilterItemParams)=\"updateFilterParams($event)\"\n                                    ></filter-item>\n                                </td>\n                            </tr>\n                        </table>\n                        <ng-template #last_child>\n                            <button type=\"button\" class=\"btn btn-success\"\n                                    (click)=\"addLastChild(index.key, ch_index.key)\">Add Last Child\n                            </button>\n                        </ng-template>\n                    </td>\n                </tr>\n            </table>\n            <ng-template #chl>\n                <button type=\"button\" class=\"btn btn-success\" (click)=\"addChild(index.key)\">Add Child</button>\n            </ng-template>\n        </td>\n    </tr>\n    </tbody>\n</table>\n<div class=\"row justify-content-md-center\">\n    <div class=\"col col-md-4\">\n        <hr class=\"my-4\">\n        <button type=\"button\" class=\"btn btn-primary btn-lg btn-block\" (click)=\"saveFilter()\">Save filter</button>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/filter-tree/filter-tree.component.ts":
/*!******************************************************!*\
  !*** ./src/app/filter-tree/filter-tree.component.ts ***!
  \******************************************************/
/*! exports provided: FilterTreeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterTreeComponent", function() { return FilterTreeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FilterTreeComponent = /** @class */ (function () {
    function FilterTreeComponent(http, router) {
        this.http = http;
        this.router = router;
        this.filter_params = {
            0: {
                'params': {},
                'child': false,
                'parent_id': false,
                'settings': {
                    'count_rows': '',
                    'quantity': '',
                    'qtt_readonly': '',
                },
            }
        };
    }
    FilterTreeComponent.prototype.ngOnInit = function () {
        this.getFiles();
    };
    FilterTreeComponent.prototype.getFiles = function () {
        var _this = this;
        this.http
            .post('/api/get_files', '')
            .subscribe(function (res) { return _this.files = res; }, function (error) {
            console.log(error);
        });
    };
    FilterTreeComponent.prototype.selectFile = function (id) {
        this.file_id = id;
        this.getMetadata(this.file_id);
    };
    FilterTreeComponent.prototype.getMetadata = function (id) {
        var _this = this;
        this.http
            .post('/api/get_metadata', { 'file_id': this.file_id })
            .subscribe(function (res) { return _this.parseMetadata(res); }, function (error) {
            console.log(error);
        });
    };
    FilterTreeComponent.prototype.parseMetadata = function (data) {
        this.totalRows = data['rows'];
        this.columns = Object.keys(data['metadata']);
        this.metadata = data['metadata'];
    };
    FilterTreeComponent.prototype.updateFilterParams = function (data) {
        console.log(data);
        this.filter_params = data;
    };
    FilterTreeComponent.prototype.addChild = function (parentIndex) {
        this.filter_params[parentIndex]['child'] = {};
        this.filter_params[parentIndex]['child'][0] = {
            'params': {},
            'child': false,
            'parent_id': parentIndex,
            'settings': {
                'count_rows': '',
                'quantity': '',
                'qtt_readonly': ''
            }
        };
        this.updateFilterParams(this.filter_params);
    };
    FilterTreeComponent.prototype.addLastChild = function (parentIndex, child_id) {
        this.filter_params[parentIndex]['child'][child_id]['child'] = {};
        this.filter_params[parentIndex]['child'][child_id]['child'][0] = {
            'params': {},
            'child': false,
            'parent_id': parentIndex,
            'child_id': child_id,
            'settings': {
                'count_rows': '',
                'quantity': '',
                'qtt_readonly': ''
            }
        };
        this.updateFilterParams(this.filter_params);
    };
    FilterTreeComponent.prototype.saveFilter = function () {
        var _this = this;
        var filter_params = {
            "0": {
                "params": { "column": "Color", "operator": "==", "value": "Red", "quantity": 4999 },
                "child": {
                    "0": {
                        "params": { "column": "Country", "operator": "==", "value": "USA", "quantity": 749 },
                        "child": {
                            "0": {
                                "params": {
                                    "column": "Drive Type",
                                    "operator": "==",
                                    "value": "All-Wheel",
                                    "quantity": 149
                                },
                                "child": false,
                                "parent_id": "0",
                                "child_id": "0",
                                "settings": { "count_rows": 205, "quantity": 20, "qtt_readonly": true }
                            },
                            "1": {
                                "params": {
                                    "column": "Drive Type",
                                    "operator": "==",
                                    "value": "Front-Wheel",
                                    "quantity": 74
                                },
                                "parent_id": "0",
                                "child": false,
                                "settings": { "count_rows": 183, "quantity": 10, "qtt_readonly": true }
                            }
                        },
                        "parent_id": "0",
                        "settings": { "count_rows": 874, "quantity": 15, "qtt_readonly": true }
                    },
                    "1": {
                        "params": { "column": "Country", "operator": "==", "value": "England", "quantity": 599 },
                        "parent_id": "0",
                        "child": {
                            "0": {
                                "params": {
                                    "column": "Engine type",
                                    "operator": "==",
                                    "value": "Boxer",
                                    "quantity": 59
                                },
                                "parent_id": "0",
                                "child": false,
                                "settings": { "count_rows": 98, "quantity": 10, "qtt_readonly": true }
                            }
                        },
                        "settings": { "count_rows": 825, "quantity": 12, "qtt_readonly": true }
                    }
                },
                "parent_id": false,
                "settings": { "count_rows": 9829, "quantity": 10, "qtt_readonly": true }
            },
            "1": {
                "params": { "column": "Color", "operator": "==", "value": "Green", "quantity": 2499 },
                "settings": { "count_rows": 9937, "quantity": 5, "qtt_readonly": true },
                "child": {
                    "0": {
                        "params": { "column": "Fuel type", "operator": "==", "value": "Petrol", "quantity": 299 },
                        "child": {
                            "0": {
                                "params": { "column": "Models", "operator": "==", "value": "X5", "quantity": 14 },
                                "parent_id": "1",
                                "child": false,
                                "settings": { "count_rows": 31, "quantity": 5, "qtt_readonly": true }
                            }
                        },
                        "parent_id": "1",
                        "settings": { "count_rows": 487, "quantity": 12, "qtt_readonly": true }
                    },
                    "1": {
                        "params": { "column": "Fuel type", "operator": "==", "value": "Gas", "quantity": 499 },
                        "parent_id": "1",
                        "child": {
                            "0": {
                                "params": {
                                    "column": "Seat heater",
                                    "operator": "==",
                                    "value": "Yes",
                                    "quantity": 99
                                },
                                "parent_id": "1",
                                "child": false,
                                "settings": { "count_rows": 239, "quantity": 20, "qtt_readonly": true }
                            }
                        },
                        "settings": { "count_rows": 507, "quantity": 20, "qtt_readonly": true }
                    }
                }
            }
        };
        var filter = {};
        for (var key in filter_params) {
            filter[key] = this.deleteUnnecessaryElem(filter_params[key]);
            if (this.checkParams(filter[key])) {
                this.save_error = true;
                return 'error';
            }
            if ('child' in filter_params[key]) {
                for (var child_key in filter_params[key]['child']) {
                    filter[key]['child'][child_key] = this.deleteUnnecessaryElem(filter_params[key]['child'][child_key]);
                    if (this.checkParams(filter[key]['child'][child_key])) {
                        this.save_error = true;
                        return 'error';
                    }
                    if ('child' in filter_params[key]['child'][child_key]) {
                        for (var child_last_key in filter_params[key]['child'][child_key]['child']) {
                            filter[key]['child'][child_key]['child'][child_last_key] = this.deleteUnnecessaryElem(filter_params[key]['child'][child_key]['child'][child_last_key]);
                            if (this.checkParams(filter[key]['child'][child_key]['child'][child_last_key])) {
                                this.save_error = true;
                                return 'error';
                            }
                        }
                    }
                }
            }
        }
        console.log(filter);
        this.http
            .post('/api/save_filter', {
            'params': filter,
            'name': 'ggsgsd',
            'file_id': 1
        })
            .subscribe(function (data) { return _this.router.navigate(['/']); }, function (error) {
            console.log(error);
        });
    };
    FilterTreeComponent.prototype.deleteUnnecessaryElem = function (object_data) {
        delete object_data.parent_id;
        delete object_data.child_id;
        delete object_data.settings;
        return object_data;
    };
    FilterTreeComponent.prototype.checkParams = function (filter) {
        return Object.keys(filter.params).length < 4;
    };
    FilterTreeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'filter-tree',
            template: __webpack_require__(/*! ./filter-tree.component.html */ "./src/app/filter-tree/filter-tree.component.html"),
            styles: [__webpack_require__(/*! ./filter-tree.component.css */ "./src/app/filter-tree/filter-tree.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], FilterTreeComponent);
    return FilterTreeComponent;
}());



/***/ }),

/***/ "./src/app/filter/filter.component.css":
/*!*********************************************!*\
  !*** ./src/app/filter/filter.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".center_div {\n    margin-top: 200px;\n}\n\n.card {\n    border-color: dodgerblue;\n}\n\n.button-group {\n    display: flex;\n    justify-content: space-evenly;\n}\n\n.operator-button {\n    margin-top: 20px;\n    display: flex;\n    justify-content: space-evenly;\n}"

/***/ }),

/***/ "./src/app/filter/filter.component.html":
/*!**********************************************!*\
  !*** ./src/app/filter/filter.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/filter/filter.component.ts":
/*!********************************************!*\
  !*** ./src/app/filter/filter.component.ts ***!
  \********************************************/
/*! exports provided: FilterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterComponent", function() { return FilterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FilterComponent = /** @class */ (function () {
    function FilterComponent(http, router) {
        this.http = http;
        this.router = router;
        this.filter_number = [0];
        this.filter_name = '';
        this.files = {};
        this.valid_filter_name = true;
        this.totalRows = 0;
        this.columns = [];
        this.value = [];
        this.filter_params = [];
    }
    FilterComponent.prototype.ngOnInit = function () {
        // this.getFiles();
    };
    FilterComponent.prototype.addElement = function () {
        this.filter_number.push(this.filter_number.length);
    };
    FilterComponent.prototype.storeFilter = function () {
        var _this = this;
        if (!this.filter_name) {
            this.valid_filter_name = false;
            return false;
        }
        this.http
            .post('/api/save_filter', {
            'params': this.filter_params,
            'name': this.filter_name,
            'file_id': this.file_id
        })
            .subscribe(function (data) { return _this.router.navigate(['/']); }, function (error) {
            console.log(error);
        });
    };
    FilterComponent.prototype.pushParams = function (data) {
        this.filter_params.push(data);
    };
    FilterComponent.prototype.selectFile = function (id) {
        this.file_id = id;
        this.getMetadata(this.file_id);
    };
    FilterComponent.prototype.getMetadata = function (id) {
        var _this = this;
        this.http
            .post('/api/get_metadata', { 'file_id': this.file_id })
            .subscribe(function (res) { return _this.parseMetadata(res); }, function (error) {
            console.log(error);
        });
    };
    FilterComponent.prototype.parseMetadata = function (data) {
        this.totalRows = data['rows'];
        this.columns = Object.keys(data['metadata']);
        this.metadata = data['metadata'];
    };
    FilterComponent.prototype.setFilterName = function (value) {
        this.filter_name = value;
    };
    FilterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-filter',
            template: __webpack_require__(/*! ./filter.component.html */ "./src/app/filter/filter.component.html"),
            styles: [__webpack_require__(/*! ./filter.component.css */ "./src/app/filter/filter.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], FilterComponent);
    return FilterComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-file-uploads (fileUploaded)=\"fileUploadHandler($event)\"></app-file-uploads>\n\n<button (click)=\"sendFile()\" >TEST: Send file to email</button>\n\n<app-statistics *ngIf=\"dataset_id\" [dataset_id]=\"dataset_id\"> Loading statistics... </app-statistics>\n<app-table *ngIf=\"dataset_id\" [dataset_id]=\"dataset_id\">Loading preview table...</app-table>\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data.service */ "./src/app/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(data) {
        this.data = data;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.fileUploadHandler = function (dataset_id) {
        console.log(dataset_id);
        this.dataset_id = dataset_id;
    };
    HomeComponent.prototype.sendFile = function () {
        this.data.get()
            .subscribe(function (res) { return console.log(res); });
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@media(min-width: 768px) {\n    .field-label-responsive {\n      padding-top: .5rem;\n      text-align: right;\n    }\n  }\n#error{\n    display: none;\n}"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"auth\">\n    <div class=\"form\">\n        <form class=\"form-horizontal\" [formGroup]=\"loginGroup\" (ngSubmit)=\"toLogin()\">\n            <div class=\"row\">\n                <div class=\"col-md-3\">\n\n                </div>\n                <div class=\"col-md-6\">\n                    <h3>Please enter your email and password</h3>\n                    <hr>\n                    <br><br>\n                    <div  class=\"alert alert-warning\" *ngIf=\"redirectingMessage\">\n                        PLease login at first\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3 field-label-responsive\">\n                    <label for=\"email\">E-Mail Address</label>\n                </div>\n                <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                        <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\n                            <div class=\"input-group-addon\" style=\"width: 2.6rem\"><i class=\"fa fa-at\"></i></div>\n                            <input type=\"text\" formControlName=\"email\" required class=\"form-control\" id=\"email\"\n                                   placeholder=\"you@example.com\" autofocus>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3 field-label-responsive\">\n                    <label for=\"password\">Password</label>\n                </div>\n                <div class=\"col-md-6\">\n                    <div class=\"form-group has-danger\">\n                        <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\n                            <div class=\"input-group-addon\" style=\"width: 2.6rem\"><i class=\"fa fa-key\"></i></div>\n                            <input type=\"password\" formControlName=\"password\" class=\"form-control\" id=\"password\"\n                                   placeholder=\"Password\" required>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3\">\n\n                </div>\n                <div class=\"col-md-6\">\n                    <strong>\n                        <div id=\"error\" class=\"alert alert-warning\">\n\n\n                        </div>\n                    </strong>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3\">\n\n                </div>\n                <div class=\"col-md-6\">\n                    <div *ngIf=\"email.invalid && (email.dirty || email.touched)\"\n                         class=\"alert alert-danger\">\n\n                        <div *ngIf=\"email.errors.required\">\n                            Email is required.\n                        </div>\n                        <div *ngIf=\"email.errors.wrongFormat\">\n                            Wrong format of email\n                        </div>\n                    </div>\n                    <div *ngIf=\"password.invalid && (password.dirty || password.touched)\"\n                         class=\"alert alert-danger\">\n                        <div *ngIf=\"password.errors || password.errors\">Password must be from 8\n                            to 40 characters long and contain at least one digit.\n                        </div>\n                    </div>\n                    <div class=\"alert alert-danger\" *ngIf=\"message\">\n                        {{ message }}\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3\"></div>\n                <div class=\"col-md-6\"><a href=\"#\" routerLink='/reset'><span class=\"glyphicon glyphicon-user\"></span>Forgot\n                    your   password?</a>\n                </div>\n                <div class=\"col-md-3\"></div>\n            </div>\n\n            <div class=\"row\">\n                <div class=\"col-md-3\"></div>\n                <div class=\"col-md-6\">\n                    <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!loginGroup.valid\"> Login</button>\n                </div>\n            </div>\n\n        </form>\n    </div>\n</div>\n  "

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/user */ "./src/app/models/user.ts");
/* harmony import */ var _directives_text_format_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../directives/text-format.directive */ "./src/app/directives/text-format.directive.ts");
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _event_emitter_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../event-emitter.service */ "./src/app/event-emitter.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth_, router, route, socket, emitter) {
        this.auth_ = auth_;
        this.router = router;
        this.route = route;
        this.socket = socket;
        this.emitter = emitter;
        this.redirectingMessage = this.route.snapshot.queryParams["authRedirecting"] || undefined;
        this.loginGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                Object(_directives_text_format_directive__WEBPACK_IMPORTED_MODULE_5__["TextFormatDirective"])(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
            ]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8),
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(40),
                Object(_directives_text_format_directive__WEBPACK_IMPORTED_MODULE_5__["TextFormatDirective"])(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
            ])
        });
    }
    LoginComponent.prototype.toLogin = function () {
        var _this = this;
        this.auth_.toLogin(new _models_user__WEBPACK_IMPORTED_MODULE_4__["User"](this.loginGroup.controls['email'].value, this.loginGroup.controls['password'].value))
            .subscribe(function (res) {
            _this.emitter.sendMessage("loggedIn");
            _this.router.navigate([_this.returnUrl]);
        }, function (err) {
            var data_txt = (JSON.stringify(err));
            var error_data = JSON.parse(data_txt);
            _this.message = error_data.error.message.toString();
        });
    };
    Object.defineProperty(LoginComponent.prototype, "password", {
        get: function () {
            return this.loginGroup.get('password');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "email", {
        get: function () {
            return this.loginGroup.get('email');
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _socket_service__WEBPACK_IMPORTED_MODULE_6__["SocketService"],
            _event_emitter_service__WEBPACK_IMPORTED_MODULE_7__["EventEmitterService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/logout/logout.component.css":
/*!*********************************************!*\
  !*** ./src/app/logout/logout.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/logout/logout.component.html":
/*!**********************************************!*\
  !*** ./src/app/logout/logout.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/logout/logout.component.ts":
/*!********************************************!*\
  !*** ./src/app/logout/logout.component.ts ***!
  \********************************************/
/*! exports provided: LogoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogoutComponent", function() { return LogoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _event_emitter_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../event-emitter.service */ "./src/app/event-emitter.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LogoutComponent = /** @class */ (function () {
    function LogoutComponent(auth_, router, emitter) {
        this.auth_ = auth_;
        this.router = router;
        this.emitter = emitter;
        this.returnUrl = '/login';
    }
    LogoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth_.toLogout(null).subscribe(function (res) {
            _this.emitter.sendMessage("loggedOut");
            _this.router.navigate([_this.returnUrl]);
        });
    };
    LogoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-logout',
            template: __webpack_require__(/*! ./logout.component.html */ "./src/app/logout/logout.component.html"),
            styles: [__webpack_require__(/*! ./logout.component.css */ "./src/app/logout/logout.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _event_emitter_service__WEBPACK_IMPORTED_MODULE_3__["EventEmitterService"]])
    ], LogoutComponent);
    return LogoutComponent;
}());



/***/ }),

/***/ "./src/app/models/data.ts":
/*!********************************!*\
  !*** ./src/app/models/data.ts ***!
  \********************************/
/*! exports provided: UserData, File, Filter, DataSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserData", function() { return UserData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "File", function() { return File; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSet", function() { return DataSet; });
var UserData = /** @class */ (function () {
    function UserData(user_files, user_datasets, user_filters) {
        this.user_files = user_files;
        this.user_datasets = user_datasets;
        this.user_filters = user_filters;
    }
    return UserData;
}());

var File = /** @class */ (function () {
    function File(id, name, size, date, rows) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.date = date;
        this.rows = rows;
    }
    return File;
}());

var Filter = /** @class */ (function () {
    function Filter(id, name) {
        this.id = id;
        this.name = name;
    }
    return Filter;
}());

var DataSet = /** @class */ (function () {
    function DataSet(id, user_id, filter_id, name, date, items) {
        this.id = id;
        this.user_id = user_id;
        this.filter_id = filter_id;
        this.name = name;
        this.date = date;
        this.items = items;
    }
    return DataSet;
}());



/***/ }),

/***/ "./src/app/models/user.ts":
/*!********************************!*\
  !*** ./src/app/models/user.ts ***!
  \********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User(email, pass) {
        this.email = email;
        this.password = pass;
    }
    return User;
}());



/***/ }),

/***/ "./src/app/navbar/navbar.component.css":
/*!*********************************************!*\
  !*** ./src/app/navbar/navbar.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url(\"//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\");\n\n.navbar-icon-top .navbar-nav .nav-link > .fa {\n  position: relative;\n  width: 36px;\n  font-size: 24px;\n}\n\n.nav-right{\n  text-align: right;\n}\n\n.navbar-icon-top .navbar-nav .nav-link > .fa > .badge {\n  font-size: 0.75rem;\n  position: absolute;\n  right: 0;\n  font-family: sans-serif;\n}\n\n.navbar-icon-top .navbar-nav .nav-link > .fa {\n  top: 3px;\n  line-height: 12px;\n}\n\n.navbar-icon-top .navbar-nav .nav-link > .fa > .badge {\n  top: -10px;\n}\n\n@media (min-width: 576px) {\n  .navbar-icon-top.navbar-expand-sm .navbar-nav .nav-link {\n    text-align: center;\n    display: table-cell;\n    height: 70px;\n    vertical-align: middle;\n    padding-top: 0;\n    padding-bottom: 0;\n  }\n\n  .navbar-icon-top.navbar-expand-sm .navbar-nav .nav-link > .fa {\n    display: block;\n    width: 48px;\n    margin: 2px auto 4px auto;\n    top: 0;\n    line-height: 24px;\n  }\n\n  .navbar-icon-top.navbar-expand-sm .navbar-nav .nav-link > .fa > .badge {\n    top: -7px;\n  }\n}\n\n@media (min-width: 768px) {\n  .navbar-icon-top.navbar-expand-md .navbar-nav .nav-link {\n    text-align: center;\n    display: table-cell;\n    height: 70px;\n    vertical-align: middle;\n    padding-top: 0;\n    padding-bottom: 0;\n  }\n\n  .navbar-icon-top.navbar-expand-md .navbar-nav .nav-link > .fa {\n    display: block;\n    width: 48px;\n    margin: 2px auto 4px auto;\n    top: 0;\n    line-height: 24px;\n  }\n\n  .navbar-icon-top.navbar-expand-md .navbar-nav .nav-link > .fa > .badge {\n    top: -7px;\n  }\n}\n\n@media (min-width: 992px) {\n  .navbar-icon-top.navbar-expand-lg .navbar-nav .nav-link {\n    text-align: center;\n    display: table-cell;\n    height: 70px;\n    vertical-align: middle;\n    padding-top: 0;\n    padding-bottom: 0;\n  }\n\n  .navbar-icon-top.navbar-expand-lg .navbar-nav .nav-link > .fa {\n    display: block;\n    width: 48px;\n    margin: 2px auto 4px auto;\n    top: 0;\n    line-height: 24px;\n  }\n\n  .navbar-icon-top.navbar-expand-lg .navbar-nav .nav-link > .fa > .badge {\n    top: -7px;\n  }\n}\n\n@media (min-width: 1200px) {\n  .navbar-icon-top.navbar-expand-xl .navbar-nav .nav-link {\n    text-align: center;\n    display: table-cell;\n    height: 70px;\n    vertical-align: middle;\n    padding-top: 0;\n    padding-bottom: 0;\n  }\n\n  .navbar-icon-top.navbar-expand-xl .navbar-nav .nav-link > .fa {\n    display: block;\n    width: 48px;\n    margin: 2px auto 4px auto;\n    top: 0;\n    line-height: 24px;\n  }\n\n  .navbar-icon-top.navbar-expand-xl .navbar-nav .nav-link > .fa > .badge {\n    top: -7px;\n  }\n}\n"

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/*!**********************************************!*\
  !*** ./src/app/navbar/navbar.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark\">\n    <a class=\"navbar-brand\" routerLink=\"/\">CarStatistic</a>\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\"\n            aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n    </button>\n\n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n        <ul class=\"navbar-nav mr-auto\">\n            <li class=\"nav-item active\">\n                <a class=\"nav-link\" routerLink=\"/\">\n                    <i class=\"fa fa-home\"></i>\n                    Home\n                </a>\n            </li>\n            <li class=\"nav-item active\">\n                <a class=\"nav-link\" routerLink=\"/data\">\n                    Data\n                </a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" href=\"#\">\n                    Messages\n                </a>\n            </li>\n             <li class=\"nav-item active\">\n                <a class=\"nav-link\" href=\"/filter\">\n                    Filter\n                </a>\n            </li>\n            <li class=\"nav-item active nav-right\" *ngIf=\"!isLogined()\">\n                <a class=\"nav-link\" routerLink=\"/login\">\n                    Login\n                </a>\n            </li>\n            <li class=\"nav-item active nav-right\" *ngIf=\"!isLogined()\">\n                <a class=\"nav-link\" routerLink=\"/register\">\n                    Sign up\n                </a>\n            </li>\n            <li class=\"nav-item active nav-right\" *ngIf=\"isLogined()\">\n                <a class=\"nav-link\" routerLink=\"/logout\">\n                    Logout\n                </a>\n            </li>\n\n        </ul>\n\n    </div>\n</nav>"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavbarComponent = /** @class */ (function () {
    function NavbarComponent() {
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.isLogined = function () {
        function getCookie(name) {
            var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }
        var isLog = getCookie("session");
        return isLog;
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/notfound/notfound.component.css":
/*!*************************************************!*\
  !*** ./src/app/notfound/notfound.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\nbody{\n\tfont-family: 'Courgette', cursive;\n}\nbody{\n\tbackground:#f3f3e1;\n}\n.wrap{\n\tmargin:0 auto;\n\twidth:1000px;\n}\n.logo{\n\tmargin-top:50px;\n}\n.logo h1{\n\tfont-size:200px;\n\tcolor:#8F8E8C;\n\ttext-align:center;\n\tmargin-bottom:1px;\n\ttext-shadow:1px 1px 6px #fff;\n}\n.logo p{\n\tcolor:rgb(228, 146, 162);\n\tfont-size:20px;\n\tmargin-top:1px;\n\ttext-align:center;\n}\n.logo p span{\n\tcolor:lightgreen;\n}\n.sub a{\n\tcolor:white;\n\tbackground:#8F8E8C;\n\ttext-decoration:none;\n\tpadding:7px 120px;\n\tfont-size:13px;\n\tfont-family: arial, serif;\n\tfont-weight:bold;\n\t-webkit-border-radius:3em;\n\t-moz-border-radius:.1em;\n\t-border-radius:.1em;\n}\n.footer{\n\tcolor:#8F8E8C;\n\tposition:absolute;\n\tright:10px;\n\tbottom:10px;\n}\n.footer a{\n\tcolor:rgb(228, 146, 162);\n}\t\n"

/***/ }),

/***/ "./src/app/notfound/notfound.component.html":
/*!**************************************************!*\
  !*** ./src/app/notfound/notfound.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"logo\">\n\n    <h1>404 not found</h1>\n    <p>Error occurred! - File not Found</p>\n\n\n</div>"

/***/ }),

/***/ "./src/app/notfound/notfound.component.ts":
/*!************************************************!*\
  !*** ./src/app/notfound/notfound.component.ts ***!
  \************************************************/
/*! exports provided: NotfoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotfoundComponent", function() { return NotfoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotfoundComponent = /** @class */ (function () {
    function NotfoundComponent() {
    }
    NotfoundComponent.prototype.ngOnInit = function () {
    };
    NotfoundComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notfound',
            template: __webpack_require__(/*! ./notfound.component.html */ "./src/app/notfound/notfound.component.html"),
            styles: [__webpack_require__(/*! ./notfound.component.css */ "./src/app/notfound/notfound.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], NotfoundComponent);
    return NotfoundComponent;
}());



/***/ }),

/***/ "./src/app/notification/notification.component.css":
/*!*********************************************************!*\
  !*** ./src/app/notification/notification.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.notification {\n    position: absolute;\n      top: 12%;\n      left: 83%;\n    width: 15%;\n    min-width: 100px;\n    min-height: 30px;\n    z-index: 10;\n}\n\n.notification-box {\n    padding: 20px;\n    background-color: #4d9ef4;\n    color: white;\n    opacity: 1;\n    transition: opacity 0.6s;\n    margin-bottom: 15px;\n    width: 100%;\n    height: 10%;\n    border-radius: 5%;\n}\n\n.closebtn {\n    top: 100%;\n    right: 100%;\n    color: white;\n    font-weight: bold;\n    float: right;\n    font-size: 22px;\n    line-height: 20px;\n    cursor: pointer;\n    transition: 0.3s;\n}\n\n.closebtn:hover {\n    color: black;\n}"

/***/ }),

/***/ "./src/app/notification/notification.component.html":
/*!**********************************************************!*\
  !*** ./src/app/notification/notification.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"notification\">\n  <div class=\"notification-box\" *ngFor=\"let msg of messages; let i = index\">\n    <span class=\"closebtn\" (click)=\"removeNotification($event.target, i)\">&times;</span>\n      {{msg.data}}\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/notification/notification.component.ts":
/*!********************************************************!*\
  !*** ./src/app/notification/notification.component.ts ***!
  \********************************************************/
/*! exports provided: NotificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationComponent", function() { return NotificationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth.guard */ "./src/app/auth.guard.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(socket, auth, auth_guard) {
        this.socket = socket;
        this.auth = auth;
        this.auth_guard = auth_guard;
        this.messages = [];
    }
    NotificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("Notification Created");
        if (this.auth_guard.isLogined()) {
            this.socket.connect();
            this.connection = this.socket.getMessages()
                .subscribe(function (data) {
                _this.messages.push(data);
            });
        }
    };
    NotificationComponent.prototype.ngOnDestroy = function () {
        this.socket.disconnect();
        console.log("Notification destroyed");
    };
    NotificationComponent.prototype.removeNotification = function (element, index) {
        element.parentElement.remove();
        this.messages.splice(index, 1);
    };
    NotificationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notification',
            template: __webpack_require__(/*! ./notification.component.html */ "./src/app/notification/notification.component.html"),
            styles: [__webpack_require__(/*! ./notification.component.css */ "./src/app/notification/notification.component.css")]
        }),
        __metadata("design:paramtypes", [_socket_service__WEBPACK_IMPORTED_MODULE_1__["SocketService"],
            _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"]])
    ], NotificationComponent);
    return NotificationComponent;
}());



/***/ }),

/***/ "./src/app/registration/registration.component.css":
/*!*********************************************************!*\
  !*** ./src/app/registration/registration.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@media(min-width: 768px) {\n  .field-label-responsive {\n    padding-top: .5rem;\n    text-align: right;\n  }\n}\n#error{\n    display: none;\n}"

/***/ }),

/***/ "./src/app/registration/registration.component.html":
/*!**********************************************************!*\
  !*** ./src/app/registration/registration.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"auth\">\n    <div class=\"form\">\n        <div class=\"row\">\n                <div class=\"col-md-3\">\n\n                </div>\n                <div class=\"col-md-6\">\n                    <div *ngIf=\"message\" class=\"alert alert-success\">\n                        <br><br>{{ message }}\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n            </div>\n        <form class=\"form-horizontal\"  [formGroup]=\"registerGroup\" (ngSubmit)=\"toRegister()\">\n            <div class=\"row\">\n                <div class=\"col-md-3\"></div>\n                <div class=\"col-md-6\">\n                    <h2>Register New User</h2>\n                    <hr>\n                    <br><br>\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <div class=\"col-md-3 field-label-responsive\">\n                    <label for=\"email\">E-Mail Address</label>\n                </div>\n                <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                        <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\n                            <div class=\"input-group-addon\" style=\"width: 2.6rem\"><i class=\"fa fa-at\"></i></div>\n                            <input type=\"text\" formControlName=\"email\" required class=\"form-control\" id=\"email\"\n                                   placeholder=\"you@example.com\" autofocus>\n\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3\">\n\n                </div>\n                <div class=\"col-md-6\">\n                    <div *ngIf=\"email == ''\">\n                        Email can not be empty\n                    </div>\n                    <div *ngIf=\"email.invalid && (email.dirty || email.touched) && validation_passed\"\n                         class=\"alert alert-danger\">\n\n                        <div *ngIf=\"email.errors.required\">\n                            Email is required.\n                        </div>\n                        <div *ngIf=\"email.errors.wrongFormat\">\n                            Wrong format of email.\n                        </div>\n\n\n\n                    </div>\n                    <div class=\" alert alert-danger\" *ngIf=\"isEmailBusy == true\">\n                            {{ error_message }}\n                        </div>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3 field-label-responsive\">\n                    <label for=\"password\">Password</label>\n                </div>\n                <div class=\"col-md-6\">\n                    <div class=\"form-group has-danger\">\n                        <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\n                            <div class=\"input-group-addon\" style=\"width: 2.6rem\"><i class=\"fa fa-key\"></i></div>\n                            <input type=\"password\" formControlName=\"password\" class=\"form-control\" id=\"password\"\n                                   placeholder=\"Password\" required>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3\">\n\n                </div>\n                <div class=\"col-md-6\">\n                     <div class=\"alert alert-danger\" *ngIf=\"password.invalid && (password.dirty || password.touched) && validation_passed\">\n                        <ul>\n                            <li *ngIf=\"password.errors || password.errors\">Password must be from 8\n                                to 40 characters long and contain at least one digit.\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n            </div>\n\n            <div class=\"row\">\n                <div class=\"col-md-3\"></div>\n                <div class=\"col-md-6\">\n                    <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!registerGroup.valid\"> Register</button>\n                </div>\n            </div>\n\n        </form>\n    </div>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/registration/registration.component.ts":
/*!********************************************************!*\
  !*** ./src/app/registration/registration.component.ts ***!
  \********************************************************/
/*! exports provided: RegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrationComponent", function() { return RegistrationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _directives_text_format_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../directives/text-format.directive */ "./src/app/directives/text-format.directive.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/user */ "./src/app/models/user.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(auth_, router, route) {
        this.auth_ = auth_;
        this.router = router;
        this.route = route;
        this.isEmailBusy = false;
        this.validation_passed = true;
        this.registerGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                Object(_directives_text_format_directive__WEBPACK_IMPORTED_MODULE_2__["TextFormatDirective"])(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
            ]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(8),
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(40),
                Object(_directives_text_format_directive__WEBPACK_IMPORTED_MODULE_2__["TextFormatDirective"])(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
            ])
        });
    }
    RegistrationComponent.prototype.toRegister = function () {
        var _this = this;
        this.auth_.toRegister(new _models_user__WEBPACK_IMPORTED_MODULE_4__["User"](this.registerGroup.controls['email'].value, this.registerGroup.controls['password'].value))
            .subscribe(function (res) {
            localStorage.setItem('token', res.token);
            var data_txt = (JSON.stringify(res));
            var response_data = JSON.parse(data_txt);
            _this.message = response_data.message;
            _this.registerGroup.setValue({ email: '', password: '' });
            _this.validation_passed = false;
        }, function (err) {
            _this.isEmailBusy = true;
            var data_txt = (JSON.stringify(err));
            var error_data = JSON.parse(data_txt);
            _this.error_message = error_data.error.message.toString();
        });
    };
    Object.defineProperty(RegistrationComponent.prototype, "password", {
        get: function () {
            return this.registerGroup.get('password');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegistrationComponent.prototype, "email", {
        get: function () {
            return this.registerGroup.get('email');
        },
        enumerable: true,
        configurable: true
    });
    RegistrationComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    RegistrationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-registration',
            template: __webpack_require__(/*! ./registration.component.html */ "./src/app/registration/registration.component.html"),
            styles: [__webpack_require__(/*! ./registration.component.css */ "./src/app/registration/registration.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], RegistrationComponent);
    return RegistrationComponent;
}());



/***/ }),

/***/ "./src/app/reset-password/reset-password.component.css":
/*!*************************************************************!*\
  !*** ./src/app/reset-password/reset-password.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@media(min-width: 768px) {\n  .field-label-responsive {\n    padding-top: .5rem;\n    text-align: right;\n  }\n}\n#error{\n    display: none;\n}\n#input_form{\n    display: none;\n}"

/***/ }),

/***/ "./src/app/reset-password/reset-password.component.html":
/*!**************************************************************!*\
  !*** ./src/app/reset-password/reset-password.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"auth\">\n    <div class=\"form\">\n        <form id=\"reset-password\" [formGroup]=\"resetPasswordGroup\" (ngSubmit)=\"toResetPassword()\">\n            <div class=\"row\">\n                <div class=\"col-md-3\">\n\n                </div>\n                <div class=\"col-md-6\">\n                    <h3>Enter your registration email.</h3>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3 field-label-responsive\">\n                    <label for=\"email\">E-Mail Address</label>\n                </div>\n                <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                        <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\n                            <div class=\"input-group-addon\" style=\"width: 2.6rem\"><i class=\"fa fa-at\"></i></div>\n                            <input type=\"text\" formControlName=\"email\" required class=\"form-control\"\n                                   placeholder=\"you@example.com\" autofocus>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n                    <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!resetPasswordGroup.valid\"> Send</button>\n                </div>\n\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3\">\n\n                </div>\n                <div class=\"col-md-6\">\n                    <div *ngIf=\"email == ''\">\n                        Email can not be empty\n                    </div>\n                    <div *ngIf=\"email.invalid && (email.dirty || email.touched) && validation_passed\"\n                         class=\"alert alert-danger\">\n                        <div *ngIf=\"email.errors.required\">\n                            Email is required.\n                        </div>\n                        <div *ngIf=\"email.errors.wrongFormat\">\n                            Wrong format of email.\n                        </div>\n                    </div>\n                    <div class=\"alert alert-danger\" *ngIf=\"error_message\">\n                        {{ error_message }}\n                    </div>\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3\">\n\n                </div>\n                <div class=\"col-md-6\">\n                    <div *ngIf=\"confirm_message\">\n                        <div class=\"alert alert-success row \">\n                            We send you confirnation token. Please check your email.\n                        </div>\n                    </div>\n\n                </div>\n                <div class=\"col-md-3\">\n\n                </div>\n            </div>\n        </form>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/reset-password/reset-password.component.ts":
/*!************************************************************!*\
  !*** ./src/app/reset-password/reset-password.component.ts ***!
  \************************************************************/
/*! exports provided: ResetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordComponent", function() { return ResetPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _directives_text_format_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../directives/text-format.directive */ "./src/app/directives/text-format.directive.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(auth_, router, route) {
        this.auth_ = auth_;
        this.router = router;
        this.route = route;
        this.validation_passed = true;
        this.resetPasswordGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                Object(_directives_text_format_directive__WEBPACK_IMPORTED_MODULE_4__["TextFormatDirective"])(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
            ])
        });
    }
    ResetPasswordComponent.prototype.toResetPassword = function () {
        var _this = this;
        this.auth_.toResetPassword(this.resetPasswordGroup.controls['email'].value)
            .subscribe(function (res) {
            _this.confirm_message = true;
            _this.resetPasswordGroup.setValue({ email: '' });
            _this.error_message = undefined;
            _this.validation_passed = false;
        }, function (err) {
            var data_txt = (JSON.stringify(err));
            var error_data = JSON.parse(data_txt);
            _this.error_message = err.error.message.toString();
        });
    };
    Object.defineProperty(ResetPasswordComponent.prototype, "email", {
        get: function () {
            return this.resetPasswordGroup.get('email');
        },
        enumerable: true,
        configurable: true
    });
    ResetPasswordComponent.prototype.ngOnInit = function () {
    };
    ResetPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reset-password',
            template: __webpack_require__(/*! ./reset-password.component.html */ "./src/app/reset-password/reset-password.component.html"),
            styles: [__webpack_require__(/*! ./reset-password.component.css */ "./src/app/reset-password/reset-password.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/socket.service.ts":
/*!***********************************!*\
  !*** ./src/app/socket.service.ts ***!
  \***********************************/
/*! exports provided: SocketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketService", function() { return SocketService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SocketService = /** @class */ (function () {
    function SocketService() {
        this.url = window.location.origin;
    }
    SocketService.prototype.connect = function () {
        console.log("user connected");
        this.socketio = socket_io_client__WEBPACK_IMPORTED_MODULE_2__(this.url);
    };
    SocketService.prototype.disconnect = function () {
        console.log("user disconnected");
        this.socketio.disconnect();
    };
    SocketService.prototype.getMessages = function () {
        var _this = this;
        return new rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"](function (observer) {
            _this.socketio.on('notification', function (data) {
                console.log("got message");
                observer.next(data);
            });
            return function () {
                _this.socketio.disconnect();
            };
        });
    };
    SocketService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], SocketService);
    return SocketService;
}());



/***/ }),

/***/ "./src/app/statistics/statistics.component.css":
/*!*****************************************************!*\
  !*** ./src/app/statistics/statistics.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tab {\n    overflow: hidden;\n    border: 1px solid #ccc;\n    border-bottom: none;\n    background-color: #f1f1f1;\n    width: 600px;\n}\n\n/* Style the buttons that are used to open the tab content */\n\n.tab button {\n    background-color: inherit;\n    float: left;\n    border: none;\n    outline: none;\n    cursor: pointer;\n    padding: 14px 16px;\n    transition: 0.3s;\n    width: 50%;\n}\n\n/* Change background color of buttons on hover */\n\n.tab button:hover {\n    background-color: #ddd;\n}\n\n/* Create an active/current tablink class */\n\n.tab button.active {\n    background-color: #ccc;\n}"

/***/ }),

/***/ "./src/app/statistics/statistics.component.html":
/*!******************************************************!*\
  !*** ./src/app/statistics/statistics.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div>\n    <div class=\"plot\">\n        <div class=\"tab\">\n          <button #pie class=\"tablinks\" (click)=\"setPlot('pie', pie, bar) \">Pie</button>\n          <button #bar class=\"tablinks\" (click)=\"setPlot('bar', bar, pie)\">Bar</button>\n        </div>\n        <label for=\"column_selection\">Select Column: </label>\n        <select id=\"column_selection\" #selection (change)=\"makeSelection(selection.value)\" class=\"selectpicker\">\n            <option *ngFor=\"let column of columns\"> {{column}}</option>\n        </select>\n        <plotly-plot *ngIf=\"this.plot=='pie'\"\n                     [config]=\"graph['config']\" [data]=\"graph['pie']\" [layout]=\"graph['layout']\"></plotly-plot>\n        <plotly-plot *ngIf=\"this.plot=='bar'\"\n            [config]=\"graph['config']\" [data]=\"graph['bar']\" [layout]=\"graph['layout']\"></plotly-plot>\n    </div>\n\n</div>"

/***/ }),

/***/ "./src/app/statistics/statistics.component.ts":
/*!****************************************************!*\
  !*** ./src/app/statistics/statistics.component.ts ***!
  \****************************************************/
/*! exports provided: StatisticsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticsComponent", function() { return StatisticsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data.service */ "./src/app/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StatisticsComponent = /** @class */ (function () {
    function StatisticsComponent(data) {
        this.data = data;
        this.plot = 'bar';
        this.graph = {
            pie: [
                { labels: [], values: [], type: 'pie' },
            ],
            bar: [
                { x: [], y: [], type: 'bar' },
            ],
            layout: {
                width: 600, height: 400, title: 'Column1',
                xaxis: { title: "", tickangle: "-90", tickformat: '.3f', showline: true, type: "category" },
                modeBarButtonsToRemove: ['sendDataToCloud', 'hoverCompareCartesian']
            },
            config: {
                displayModeBar: true,
                displaylogo: false,
                modeBarButtonsToRemove: ['sendDataToCloud', 'pan2d', 'lasso2d', 'autoScale2d', 'zoom2d', 'select2d',
                    'resetScale2d', 'toggleSpikelines', 'toggleHover', 'hoverClosestCartesian', 'hoverCompareCartesian'],
            }
        };
    }
    Object.defineProperty(StatisticsComponent.prototype, "dataset_id", {
        get: function () {
            return this.dataset_id_;
        },
        set: function (name) {
            this.dataset_id_ = name;
            this.updateGraph();
        },
        enumerable: true,
        configurable: true
    });
    StatisticsComponent.prototype.updateGraph = function () {
        var _this = this;
        this.data.getStatistics(this.dataset_id)
            .subscribe(function (res) {
            _this.statistics = res;
            _this.columns = Object.keys(res);
            _this.graph.layout.title = _this.columns[0];
            _this.graph.pie[0].labels = Object.keys(res[_this.columns[0]]);
            _this.graph.pie[0].values = Object.values(res[_this.columns[0]]);
            _this.graph.bar[0].x = Object.keys(res[_this.columns[0]]);
            _this.graph.bar[0].y = Object.values(res[_this.columns[0]]);
        }, function (error) { console.log(error); });
    };
    StatisticsComponent.prototype.ngOnInit = function () {
        this.updateGraph();
    };
    StatisticsComponent.prototype.setPlot = function (plot_type, target, opp) {
        this.plot = plot_type;
        target.className += ' active';
        opp.className = opp.className.replace(' active', '');
    };
    StatisticsComponent.prototype.makeSelection = function (value) {
        this.graph.layout.title = value;
        this.graph.pie[0].labels = Object.keys(this.statistics[value]);
        this.graph.pie[0].values = Object.values(this.statistics[value]);
        this.graph.bar[0].x = Object.keys(this.statistics[value]);
        this.graph.bar[0].y = Object.values(this.statistics[value]);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], StatisticsComponent.prototype, "dataset_id", null);
    StatisticsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-statistics',
            template: __webpack_require__(/*! ./statistics.component.html */ "./src/app/statistics/statistics.component.html"),
            styles: [__webpack_require__(/*! ./statistics.component.css */ "./src/app/statistics/statistics.component.css")]
        }),
        __metadata("design:paramtypes", [_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]])
    ], StatisticsComponent);
    return StatisticsComponent;
}());



/***/ }),

/***/ "./src/app/table/table.component.css":
/*!*******************************************!*\
  !*** ./src/app/table/table.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url(\"//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\");"

/***/ }),

/***/ "./src/app/table/table.component.html":
/*!********************************************!*\
  !*** ./src/app/table/table.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table class=\"table table-bordered table-hover\">\n    <thead>\n        <tr>\n            <th *ngFor=\"let col_name of columns\">{{col_name}}</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let row of rows\">\n          <td *ngFor=\"let val of row\">{{val}} </td>\n        </tr>\n    </tbody>\n</table>"

/***/ }),

/***/ "./src/app/table/table.component.ts":
/*!******************************************!*\
  !*** ./src/app/table/table.component.ts ***!
  \******************************************/
/*! exports provided: TableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableComponent", function() { return TableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data.service */ "./src/app/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TableComponent = /** @class */ (function () {
    function TableComponent(data) {
        this.data = data;
    }
    Object.defineProperty(TableComponent.prototype, "dataset_id", {
        get: function () {
            return this.dataset_id_;
        },
        set: function (dataset_id) {
            this.dataset_id_ = dataset_id;
            this.updateTable();
        },
        enumerable: true,
        configurable: true
    });
    TableComponent.prototype.updateTable = function () {
        var _this = this;
        this.data.getRows(this.dataset_id, 10)
            .subscribe(function (res) { _this.columns = res['columns']; _this.rows = res['rows']; }, function (error) { console.log(error); });
    };
    TableComponent.prototype.ngOnInit = function () {
        this.updateTable();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], TableComponent.prototype, "dataset_id", null);
    TableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table',
            template: __webpack_require__(/*! ./table.component.html */ "./src/app/table/table.component.html"),
            styles: [__webpack_require__(/*! ./table.component.css */ "./src/app/table/table.component.css")]
        }),
        __metadata("design:paramtypes", [_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]])
    ], TableComponent);
    return TableComponent;
}());



/***/ }),

/***/ "./src/app/user-data/user-data-sets/user-data-set/user-data-set.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/user-data/user-data-sets/user-data-set/user-data-set.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dataset-statistic{\n    background-color: black\n}"

/***/ }),

/***/ "./src/app/user-data/user-data-sets/user-data-set/user-data-set.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/user-data/user-data-sets/user-data-set/user-data-set.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    <button *ngIf=\"!showDatasetStat\" class=\"stat\" (click)=\"getStatDataset()\">Stat</button>\n    <button *ngIf=\"showDatasetStat\" class=\"stat\" (click)=\"getStatDataset()\">Hide</button>\n    <h3>{{ userdataset.name }}</h3>\n    <div>\n    <span>date: {{ userdataset.date }}</span>\n    </div>\n    <app-statistics class=\"dataset-statistic\" *ngIf=\"showDatasetStat\" [dataset_id]=\"userdataset.id\"></app-statistics>\n</div>"

/***/ }),

/***/ "./src/app/user-data/user-data-sets/user-data-set/user-data-set.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/user-data/user-data-sets/user-data-set/user-data-set.component.ts ***!
  \***********************************************************************************/
/*! exports provided: UserDataSetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDataSetComponent", function() { return UserDataSetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/data */ "./src/app/models/data.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserDataSetComponent = /** @class */ (function () {
    function UserDataSetComponent() {
        this.showDatasetStat = false;
    }
    UserDataSetComponent.prototype.getStatDataset = function () {
        if (this.showDatasetStat == true) {
            this.showDatasetStat = false;
        }
        else {
            this.showDatasetStat = true;
        }
    };
    UserDataSetComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_data__WEBPACK_IMPORTED_MODULE_1__["DataSet"])
    ], UserDataSetComponent.prototype, "userdataset", void 0);
    UserDataSetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-data-set',
            template: __webpack_require__(/*! ./user-data-set.component.html */ "./src/app/user-data/user-data-sets/user-data-set/user-data-set.component.html"),
            styles: [__webpack_require__(/*! ./user-data-set.component.css */ "./src/app/user-data/user-data-sets/user-data-set/user-data-set.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], UserDataSetComponent);
    return UserDataSetComponent;
}());



/***/ }),

/***/ "./src/app/user-data/user-data-sets/user-data-sets.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/user-data/user-data-sets/user-data-sets.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-data/user-data-sets/user-data-sets.component.html":
/*!************************************************************************!*\
  !*** ./src/app/user-data/user-data-sets/user-data-sets.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3>Your datasets:</h3>\n<div>\n    <app-user-data-set *ngFor=\"let item of userdatasets\" [userdataset]=\"item\"></app-user-data-set>\n</div>\n"

/***/ }),

/***/ "./src/app/user-data/user-data-sets/user-data-sets.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/user-data/user-data-sets/user-data-sets.component.ts ***!
  \**********************************************************************/
/*! exports provided: UserDataSetsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDataSetsComponent", function() { return UserDataSetsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/user-data.service */ "./src/app/_services/user-data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserDataSetsComponent = /** @class */ (function () {
    function UserDataSetsComponent(userData) {
        this.userData = userData;
        this.userdatasets = [];
    }
    UserDataSetsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userData.getUserData().subscribe(function (data) { return _this.userdatasets = data['user_datasets']; });
    };
    UserDataSetsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-data-sets',
            template: __webpack_require__(/*! ./user-data-sets.component.html */ "./src/app/user-data/user-data-sets/user-data-sets.component.html"),
            styles: [__webpack_require__(/*! ./user-data-sets.component.css */ "./src/app/user-data/user-data-sets/user-data-sets.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_data_service__WEBPACK_IMPORTED_MODULE_1__["UserDataService"]])
    ], UserDataSetsComponent);
    return UserDataSetsComponent;
}());



/***/ }),

/***/ "./src/app/user-data/user-data.component.css":
/*!***************************************************!*\
  !*** ./src/app/user-data/user-data.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".verticalLine {\n    border-left: 2px solid #b1abab;\n  }\n.heading-user-data{\n  text-align: center;\n  margin-top: 4%;\n}"

/***/ }),

/***/ "./src/app/user-data/user-data.component.html":
/*!****************************************************!*\
  !*** ./src/app/user-data/user-data.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div>\n    <section class=\"user-data\" *ngIf=\"userdata\">\n        <h2 class=\"heading-user-data\">All history of your activity</h2><hr>\n    <div class=\"row\">\n        <div class=\"col-md-1\"></div>\n        <div class=\"col-md-3\"><app-user-files></app-user-files></div>\n        <div class=\"verticalLine\"></div>\n        <div class=\"col-md-3\"><app-user-filters></app-user-filters></div>\n        <div class=\"verticalLine\"></div>\n        <div class=\"col-md-3\"><app-user-data-sets></app-user-data-sets></div>\n        <div class=\"col-md-2\"></div>\n    </div>\n    </section>\n    <section class=\"empty-user-data\" *ngIf=\"!userdata\">\n        <h3>You have no files to work with</h3>\n        <p>Please upload file use button below or drag files here</p>\n        <div>\n            <input\n                    style=\"display: none\"\n                    type=\"file\" (change)=\"onFileSelected($event)\"\n                    class=\"custom-file\"\n                    #fileInput\n            >\n            <button type=\"button\" (click)=\"fileInput.click()\">+</button>\n        </div>\n    </section>\n</div>\n<h2>You can upload new file:</h2>\n<app-file-uploads></app-file-uploads>\n\n"

/***/ }),

/***/ "./src/app/user-data/user-data.component.ts":
/*!**************************************************!*\
  !*** ./src/app/user-data/user-data.component.ts ***!
  \**************************************************/
/*! exports provided: UserDataComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDataComponent", function() { return UserDataComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/user-data.service */ "./src/app/_services/user-data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserDataComponent = /** @class */ (function () {
    function UserDataComponent(userData) {
        this.userData = userData;
    }
    UserDataComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userData
            .getUserData()
            .subscribe(function (data) {
            _this.userdata = data;
        });
        console.log(this.userdata);
    };
    UserDataComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-data',
            template: __webpack_require__(/*! ./user-data.component.html */ "./src/app/user-data/user-data.component.html"),
            styles: [__webpack_require__(/*! ./user-data.component.css */ "./src/app/user-data/user-data.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_data_service__WEBPACK_IMPORTED_MODULE_1__["UserDataService"]])
    ], UserDataComponent);
    return UserDataComponent;
}());



/***/ }),

/***/ "./src/app/user-data/user-files/user-file/user-file.component.css":
/*!************************************************************************!*\
  !*** ./src/app/user-data/user-files/user-file/user-file.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-data/user-files/user-file/user-file.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/user-data/user-files/user-file/user-file.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!fileDeleted\">\n    <h3>{{ file_index + 1 }}. {{ userfile.name }}</h3>\n    <button *ngIf=\"!showDatasetStat\" class=\"stat\" (click)=\"getStatDataset()\">Stat</button>\n    <button *ngIf=\"showDatasetStat\" class=\"stat\" (click)=\"getStatDataset()\">Hide</button>\n    <div class=\"file-stat\">\n        <span> rows: {{ userfile.rows }} </span>\n        <span> size: {{ userfile.size }} MB </span>\n        <span>       {{ userfile.date }}</span>\n\n    </div>\n    <div *ngIf=\"errorMessage\" class=\"alert alert-danger\">\n        {{ errorMessage }}\n    </div>\n    \n    <button  class=\"btn btn-danger\" (click)=\"deleteFile(userfile.id)\">Delete</button>\n    <app-statistics  *ngIf=\"showDatasetStat\" [dataset_id]=\"userfile.id\"></app-statistics>\n</div>\n"

/***/ }),

/***/ "./src/app/user-data/user-files/user-file/user-file.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/user-data/user-files/user-file/user-file.component.ts ***!
  \***********************************************************************/
/*! exports provided: UserFileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserFileComponent", function() { return UserFileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/data */ "./src/app/models/data.ts");
/* harmony import */ var _user_file_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../user-file.service */ "./src/app/user-file.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserFileComponent = /** @class */ (function () {
    function UserFileComponent(file) {
        this.file = file;
        this.showDatasetStat = false;
        this.fileDeleted = false;
    }
    UserFileComponent.prototype.getStatDataset = function () {
        if (this.showDatasetStat == true) {
            this.showDatasetStat = false;
        }
        else {
            this.showDatasetStat = true;
        }
    };
    UserFileComponent.prototype.deleteFile = function (fileId) {
        var _this = this;
        this.confirmed = confirm("Are you realy want to delete this file?");
        if (!this.confirmed) {
            return false;
        }
        this.file.deleteUserFile(fileId).subscribe(function (res) {
            _this.fileDeleted = true;
        }, function (err) {
            var data_txt = (JSON.stringify(err));
            var error_data = JSON.parse(data_txt);
            _this.errorMessage = error_data.error.message.toString();
        });
    };
    UserFileComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_data__WEBPACK_IMPORTED_MODULE_1__["File"])
    ], UserFileComponent.prototype, "userfile", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], UserFileComponent.prototype, "file_index", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], UserFileComponent.prototype, "dataset_id", void 0);
    UserFileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-file',
            template: __webpack_require__(/*! ./user-file.component.html */ "./src/app/user-data/user-files/user-file/user-file.component.html"),
            styles: [__webpack_require__(/*! ./user-file.component.css */ "./src/app/user-data/user-files/user-file/user-file.component.css")]
        }),
        __metadata("design:paramtypes", [_user_file_service__WEBPACK_IMPORTED_MODULE_2__["UserFileService"]])
    ], UserFileComponent);
    return UserFileComponent;
}());



/***/ }),

/***/ "./src/app/user-data/user-files/user-files.component.css":
/*!***************************************************************!*\
  !*** ./src/app/user-data/user-files/user-files.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-data/user-files/user-files.component.html":
/*!****************************************************************!*\
  !*** ./src/app/user-data/user-files/user-files.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    <h3>Your files:</h3>\n    <label>Search: <input [(ngModel)]=\"term\" placeholder=\"name, size, or any information\"></label>  \n    <app-user-file *ngFor=\"let item of userfiles|filter:term ; let i = index\"[file_index]=\"i\" [userfile]=\"item\"></app-user-file>\n</div>\n<div>\n    <input\n        style=\"display: none\"\n        type=\"file\" (change)=\"onFileSelected($event)\"\n        class=\"custom-file\"\n        #fileInput>\n</div>\n"

/***/ }),

/***/ "./src/app/user-data/user-files/user-files.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/user-data/user-files/user-files.component.ts ***!
  \**************************************************************/
/*! exports provided: UserFilesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserFilesComponent", function() { return UserFilesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/user-data.service */ "./src/app/_services/user-data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserFilesComponent = /** @class */ (function () {
    function UserFilesComponent(userData) {
        this.userData = userData;
        this.userfiles = [];
    }
    UserFilesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userData.getUserData().subscribe(function (data) { return _this.userfiles = data['user_files']; });
    };
    UserFilesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-files',
            template: __webpack_require__(/*! ./user-files.component.html */ "./src/app/user-data/user-files/user-files.component.html"),
            styles: [__webpack_require__(/*! ./user-files.component.css */ "./src/app/user-data/user-files/user-files.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_data_service__WEBPACK_IMPORTED_MODULE_1__["UserDataService"]])
    ], UserFilesComponent);
    return UserFilesComponent;
}());



/***/ }),

/***/ "./src/app/user-data/user-filters/user-filter/user-filter.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/user-data/user-filters/user-filter/user-filter.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-data/user-filters/user-filter/user-filter.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/user-data/user-filters/user-filter/user-filter.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    <button class=\"stat\">stat</button>\n    <h3>{{ userfilter.name }}</h3>\n    <select>opt</select>\n</div>\n"

/***/ }),

/***/ "./src/app/user-data/user-filters/user-filter/user-filter.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/user-data/user-filters/user-filter/user-filter.component.ts ***!
  \*****************************************************************************/
/*! exports provided: UserFilterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserFilterComponent", function() { return UserFilterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/data */ "./src/app/models/data.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserFilterComponent = /** @class */ (function () {
    function UserFilterComponent() {
    }
    UserFilterComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_data__WEBPACK_IMPORTED_MODULE_1__["Filter"])
    ], UserFilterComponent.prototype, "userfilter", void 0);
    UserFilterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-filter',
            template: __webpack_require__(/*! ./user-filter.component.html */ "./src/app/user-data/user-filters/user-filter/user-filter.component.html"),
            styles: [__webpack_require__(/*! ./user-filter.component.css */ "./src/app/user-data/user-filters/user-filter/user-filter.component.css")]
        })
    ], UserFilterComponent);
    return UserFilterComponent;
}());



/***/ }),

/***/ "./src/app/user-data/user-filters/user-filters.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/user-data/user-filters/user-filters.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user-data/user-filters/user-filters.component.html":
/*!********************************************************************!*\
  !*** ./src/app/user-data/user-filters/user-filters.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3>Your filters:</h3>\n<div>\n    <app-user-filter *ngFor=\"let item of userfilters\" [userfilter]=\"item\"></app-user-filter>\n</div>\n"

/***/ }),

/***/ "./src/app/user-data/user-filters/user-filters.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/user-data/user-filters/user-filters.component.ts ***!
  \******************************************************************/
/*! exports provided: UserFiltersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserFiltersComponent", function() { return UserFiltersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/user-data.service */ "./src/app/_services/user-data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserFiltersComponent = /** @class */ (function () {
    function UserFiltersComponent(userData) {
        this.userData = userData;
        this.userfilters = [];
    }
    UserFiltersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userData.getUserData().subscribe(function (data) { return _this.userfilters = data['user_filters']; });
    };
    UserFiltersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-filters',
            template: __webpack_require__(/*! ./user-filters.component.html */ "./src/app/user-data/user-filters/user-filters.component.html"),
            styles: [__webpack_require__(/*! ./user-filters.component.css */ "./src/app/user-data/user-filters/user-filters.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_data_service__WEBPACK_IMPORTED_MODULE_1__["UserDataService"]])
    ], UserFiltersComponent);
    return UserFiltersComponent;
}());



/***/ }),

/***/ "./src/app/user-file.service.ts":
/*!**************************************!*\
  !*** ./src/app/user-file.service.ts ***!
  \**************************************/
/*! exports provided: UserFileService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserFileService", function() { return UserFileService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserFileService = /** @class */ (function () {
    function UserFileService(_http) {
        this._http = _http;
        this.deleteUserFileUrl = '/api/delete_file';
    }
    UserFileService.prototype.deleteUserFile = function (fileId) {
        return this._http.get(this.deleteUserFileUrl + '/' + fileId);
    };
    UserFileService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserFileService);
    return UserFileService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/izhyk/PycharmProjects/car-statistics/car-statistics/app/static/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map