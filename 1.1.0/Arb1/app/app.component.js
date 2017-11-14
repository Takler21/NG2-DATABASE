"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_service_1 = require("./http.service");
var ngx_papaparse_1 = require("ngx-papaparse");
var AppComponent = (function () {
    function AppComponent(_httpService, _papaParse) {
        this._httpService = _httpService;
        this._papaParse = _papaParse;
        this.luna = "Una cebolla";
        this.objey = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.luna.split(',');
        this._httpService.get("../esquema.csv").subscribe(function (a) {
            _this.prueba = _this._papaParse.parse(a).data;
            console.log(_this.prueba);
        }, function (error) { return _this.msg = error; });
    };
    AppComponent.prototype.mostrar = function () {
        this.objey = this.prueba[2].toString().split(',');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "user-app",
            templateUrl: 'app/app.component.html'
        }),
        __metadata("design:paramtypes", [http_service_1.HttpService, ngx_papaparse_1.PapaParseService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map