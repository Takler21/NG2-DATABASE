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
        this.buscVal = "";
        this.esquema = [];
        this.primN = [];
        this.hijas = [];
        this.padres = [];
        this.desplegados = [];
        this.indiceEsq = [];
        this.optionals = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._httpService.get("../esquema.csv").subscribe(function (a) {
            _this.esquema = _this._papaParse.parse(a, { header: true }).data;
            console.log(_this.esquema);
        }, function (error) { return _this.msg = error; }, function () {
            _this.distribuir();
            //this.getRelacion();
        });
    };
    //getRelacion() {
    //    let relacion: any[];
    //    for (let item of this.esquema) {
    //        relacion.push({
    //            'padre': item.id,
    //            'hijo': item.properties.split(',')
    //        });
    //    }
    //    console.log(relacion);
    //}
    AppComponent.prototype.distribuir = function () {
        var _this = this;
        var aux;
        this.campos = Object.keys(this.esquema[0]);
        this.esquema.forEach(function (obj) {
            aux = "";
            if (obj.id)
                _this.indiceEsq[obj.id] = obj;
            if (obj.properties) {
                aux = obj.properties.split(',');
                //console.log("aux - " + Object.keys(aux));
                _this.hijas[obj.id] = aux;
                aux.forEach(function (h) {
                    if (h.includes(":")) {
                        if (!_this.padres[h]) {
                            _this.padres[h] = [];
                            _this.padres[h].push(obj.id);
                        }
                        _this.optionals[h] = h.split(":");
                        if (!_this.padres[_this.optionals[h][1]])
                            _this.padres[_this.optionals[h][1]] = [_this.optionals[h][0]];
                        else
                            _this.padres[_this.optionals[h][1]].push(_this.optionals[h][0]);
                        if (!_this.padres[_this.optionals[h][0]]) {
                            _this.padres[_this.optionals[h][0]] = [];
                            _this.padres[_this.optionals[h][0]].push(obj.id);
                        }
                        else
                            _this.padres[_this.optionals[h][0]].push(obj.id);
                    }
                    else {
                        if (!_this.padres[h]) {
                            _this.padres[h] = [];
                            _this.padres[h].push(obj.id);
                        }
                        else
                            _this.padres[h].push(obj.id);
                    }
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
        this.mostrar = this.primN;
    };
    AppComponent.prototype.recursividadPadres = function (id) {
        var _this = this;
        if (this.padres[id]) {
            this.padres[id].forEach(function (padre) {
                _this.desplegados[padre] = padre;
                _this.recursividadPadres(padre);
            });
        }
        else {
            console.log("Pase Por aqui");
            this.mostrar.push(id);
        }
    };
    AppComponent.prototype.comprobar = function () {
        var _this = this;
        var val = false;
        this.esquema.forEach(function (obj) {
            if (obj.id == _this.buscVal.trim() && _this.buscVal.trim()) {
                val = true;
            }
        });
        if (!this.buscVal.trim()) {
            this.mostrar = this.primN;
            this.desplegados = [];
        }
        if (val) {
            this.mostrar = [];
            this.importado = this.indiceEsq[this.buscVal.trim()];
            this.desplegados[this.buscVal.trim()] = [this.buscVal.trim()];
            this.recursividadPadres(this.buscVal.trim());
            Object.keys(this.optionals).forEach(function (o) {
                _this.optionals[o].forEach(function (post) {
                    if (_this.optionals[o][0] == _this.buscVal.trim() || _this.optionals[o][1] == _this.buscVal.trim()) {
                        _this.desplegados[_this.optionals[o][0]] = [_this.optionals[o][0]];
                        console.log("Prueba : " + _this.optionals[o][0] + " y " + o + ", ademas " + _this.padres[o]);
                        //tengo que eliminar  antes los otros prim
                        _this.mostrar = [];
                        _this.padres[o].forEach(function (p) {
                            _this.mostrar.push(p);
                        });
                    }
                });
            });
            console.log(this.mostrar);
        }
    };
    AppComponent.prototype.verInfo = function (item) {
        this.importado = this.indiceEsq[item];
        console.log("tengo " + this.importado.id);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "importado", void 0);
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