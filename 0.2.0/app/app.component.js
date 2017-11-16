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
        this.esquema = [];
        this.primN = [];
        this.hijas = [];
        this.padres = [];
        this.luna = "Una cebolla";
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.luna.split(',');
        this._httpService.get("../esquema.csv").subscribe(function (a) {
            _this.esquema = _this._papaParse.parse(a, { header: true }).data;
            console.log(_this.esquema);
        }, function (error) { return _this.msg = error; }, function () {
            _this.distribuir();
            //this.getRelacion();
        });
    };
    AppComponent.prototype.getRelacion = function () {
        var relacion;
        for (var _i = 0, _a = this.esquema; _i < _a.length; _i++) {
            var item = _a[_i];
            relacion.push({
                'padre': item.id,
                'hijo': item.properties.split(',')
            });
        }
        console.log(relacion);
    };
    AppComponent.prototype.distribuir = function () {
        var _this = this;
        var aux;
        this.esquema.forEach(function (obj) {
            aux = "";
            if (obj.properties) {
                aux = obj.properties.split(',');
                //console.log("aux - " + Object.keys(aux));
                _this.hijas[obj.id] = aux;
                aux.forEach(function (h) {
                    console.log("Ejem: " + h + " padre: " + obj.id);
                    _this.padres[h] = obj.id;
                });
            }
        });
        this.esquema.forEach(function (obj) {
            if (obj.id) {
                if (!_this.padres[obj.id]) {
                    //console.log("padres1 " + obj.id);
                    _this.primN.push(obj.id);
                }
            }
        });
        this.objey = "amor";
    };
    AppComponent.prototype.mostrar = function () {
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