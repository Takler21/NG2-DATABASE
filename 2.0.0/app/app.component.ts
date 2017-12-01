import { Component, OnInit, Input } from "@angular/core"
import { HttpService } from './http.service';
import { PapaParseService } from 'ngx-papaparse';

import { TreeView } from './treeview.component';
import { CollapseComponent } from './collapse.component';

@Component({
    selector: "user-app",
    templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit {

    msg: any;
    buscVal: string = "";
    esquema: any[] = [];
    primN: any[] = [];
    hijas: any[] = [];
    padres: any[] = [];
    mostrar: any[];
    desplegados: any[] = [];
    campos: string[];
    //Tal vez pueda omitir el indiceEsq si modifico la clave de esquemas al id
    indiceEsq: any[] = [];
    optionals: any[] = [];
    @Input() importado: any;

    constructor(private _httpService: HttpService, private _papaParse: PapaParseService) { }

    ngOnInit() {
        this._httpService.get("../esquema.csv").subscribe(a => {
            this.esquema = this._papaParse.parse(a, { header: true }).data;
        },
            error => this.msg = error,
            () => {
                this.distribuir();
                //this.getRelacion();
            });


    }

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

    distribuir() {

        let aux: any;
        this.campos = Object.keys(this.esquema[0])
        this.esquema.forEach(obj => {
            aux = "";
            if (obj.id)
                this.indiceEsq[obj.id] = obj;
            if (obj.properties) {
                aux = obj.properties.split(',');
                this.hijas[obj.id] = aux;
                aux.forEach((h: string) => {
                    if (h.includes(":")) {
                        if (!this.padres[h]) {
                            this.padres[h] = [];
                            this.padres[h].push(obj.id);
                        }
                        this.optionals[h] = h.split(":")
                        if (!this.padres[this.optionals[h][1]])
                            this.padres[this.optionals[h][1]] = [this.optionals[h][0]];
                        else
                            this.padres[this.optionals[h][1]].push(this.optionals[h][0]);
                        if (!this.padres[this.optionals[h][0]]) {
                            this.padres[this.optionals[h][0]] = [];
                            this.padres[this.optionals[h][0]].push(obj.id);
                        }
                        else
                            this.padres[this.optionals[h][0]].push(obj.id);
                    }
                    else {
                        if (!this.padres[h]) {
                            this.padres[h] = [];
                            this.padres[h].push(obj.id)
                        }
                        else
                            this.padres[h].push(obj.id);
                    }
                });
            }
        });
        this.esquema.forEach(obj => {
            if (obj.id) {

                if (!this.padres[obj.id]) {
                    this.primN.push(obj.id);
                }

            }
        });
        this.mostrar = this.primN;
    }

    recursividadPadres(id: string) {
        if (this.padres[id]) {
            this.padres[id].forEach((padre: string) => {
                this.desplegados[padre] = padre;
                this.recursividadPadres(padre);
            });
        }
        else {
            this.mostrar.push(id);

        }
    }

    comprobar() {
        let val = false;
        this.esquema.forEach(obj => {
            if (obj.id == this.buscVal.trim() && this.buscVal.trim()) {
                val = true;
            }
        })

        if (!this.buscVal.trim()) {
            this.mostrar = this.primN;
            this.desplegados = [];
        }

        if (val) {
            this.mostrar = [];
            this.importado = this.indiceEsq[this.buscVal.trim()];
            this.desplegados[this.buscVal.trim()] = [this.buscVal.trim()];
            this.recursividadPadres(this.buscVal.trim());
            Object.keys(this.optionals).forEach(o => {
                this.optionals[o].forEach((post: any) => {
                    if (this.optionals[o][0] == this.buscVal.trim() || this.optionals[o][1] == this.buscVal.trim()) {
                        this.desplegados[this.optionals[o][0]] = [this.optionals[o][0]];

                        this.mostrar = [];
                        this.padres[o].forEach((p: string) => {
                            this.mostrar.push(p);
                        })
                    }
                });
            });
        }
    }

    verInfo(item: any) {
        this.importado = this.indiceEsq[item];
    }

}