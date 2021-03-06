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
//Este componente es usado de forma recursiva para abarcar todos los niveles del arbol.
//Ira descendiendo hasta el ultimo nivel posible
var TreeView = (function () {
    function TreeView() {
        this.impo = new core_1.EventEmitter();
    }
    //Podria construir una funcion que me permitiera comprobar si tiene hijos
    //para aplicar solo en esos casos el collapse, por ejemplo con un booleano
    TreeView.prototype.mandar = function () {
        this.impo.emit(this.importado);
    };
    TreeView.prototype.changeImp = function (id) {
        this.importado = this.indiceEsq[id];
        this.mandar();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TreeView.prototype, "hijas", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TreeView.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TreeView.prototype, "desplegados", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TreeView.prototype, "optionals", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeView.prototype, "indiceEsq", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TreeView.prototype, "importado", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TreeView.prototype, "impo", void 0);
    TreeView = __decorate([
        core_1.Component({
            selector: 'treeview',
            templateUrl: 'app/treeview.component.html'
        })
    ], TreeView);
    return TreeView;
}());
exports.TreeView = TreeView;
//# sourceMappingURL=treeview.component.js.map