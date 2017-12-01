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
var Extra = (function () {
    function Extra(_httpService, _papaParse) {
        this._httpService = _httpService;
        this._papaParse = _papaParse;
        this.campos = [];
    }
    Extra.prototype.ngOnInit = function () {
        var _this = this;
        this._httpService.get("../literales.csv").subscribe(function (a) {
            _this.literal = _this._papaParse.parse(a, { header: true, delimiter: "|" }).data;
        }, function (error) { return _this.msg = error; }, function () {
            _this.crearIndice();
        });
        this._httpService.get("../ConfiguracionHD.csv").subscribe(function (a) {
            _this.configuracionHD = _this._papaParse.parse(a).data;
        }, function (error) { return _this.msg = error; }, function () {
            _this.configHd();
        });
    };
    Extra.prototype.crearIndice = function () {
        var _this = this;
        this.guide = [];
        Object.keys(this.literal[0]).forEach(function (c) {
            if (c != "id")
                _this.campos.push(c);
        });
        this.literal.forEach(function (post) {
            var aux = post.id.toString();
            if (!_this.guide[aux]) {
                _this.guide[aux] = [];
                _this.guide[aux].push(post);
            }
            else {
                _this.guide[aux].push(post);
            }
        });
    };
    Extra.prototype.configHd = function () {
        var _this = this;
        this.configuracionHD.forEach(function (con) {
            _this.configuracionHD[con[0]] = [];
            _this.configuracionHD[con[0]].push(con[1], con[2], con[3], con[4], con[5], con[6], con[7], con[8], con[9], con[10], con[11]);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Extra.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], Extra.prototype, "indiceEsq", void 0);
    Extra = __decorate([
        core_1.Component({
            selector: 'panel-extra',
            templateUrl: 'app/extra.component.html'
        }),
        __metadata("design:paramtypes", [http_service_1.HttpService, ngx_papaparse_1.PapaParseService])
    ], Extra);
    return Extra;
}());
exports.Extra = Extra;
//# sourceMappingURL=extra.component.js.map