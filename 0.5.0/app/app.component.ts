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
    desplegados: string[] = [];
    campos: string[];
    indiceEsq: any[] = [];
    imp: any;
    @Input() importado: any;

    constructor(private _httpService: HttpService, private _papaParse: PapaParseService) { }

    ngOnInit() {
        this._httpService.get("../esquema.csv").subscribe(a => {
            this.esquema = this._papaParse.parse(a, { header: true }).data;
            console.log(this.esquema);
        },
            error => this.msg = error,
            () => {
                this.distribuir();
                //this.getRelacion();
            });


    }

    getRelacion() {
        let relacion: any[];
        for (let item of this.esquema) {
            relacion.push({
                'padre': item.id,
                'hijo': item.properties.split(',')
            });
        }
        console.log(relacion);
    }

    distribuir() {

        let aux: any;
        this.campos = Object.keys(this.esquema[0])
        this.esquema.forEach(obj => {
            aux = "";
            if (obj.id)
                this.indiceEsq[obj.id] = obj;
            if (obj.properties) {
                aux = obj.properties.split(',');
                //console.log("aux - " + Object.keys(aux));
                this.hijas[obj.id] = aux;
                aux.forEach((h: any) => {
                    console.log("Ejem: " + h + " padre: " + obj.id)
                    if (!this.padres[h]) {
                        this.padres[h] = [];
                        this.padres[h].push(obj.id)
                    }
                    else
                        this.padres[h].push(obj.id);
                });
            }
        });
        this.esquema.forEach(obj => {
            if (obj.id) {

                if (!this.padres[obj.id]) {
                    //console.log("padres1 " + obj.id);
                    this.primN.push(obj.id);
                }

            }
        });
        this.mostrar = this.primN;
        console.log(this.mostrar.indexOf('tieneHechosEconomicos'))
    }

    recursividadPadres(id: string) {
        if (this.padres[id]) {
            this.padres[id].forEach((padre: string) => {
                console.log("Pase Por aqui 1º");
                console.log(padre);
                this.desplegados[padre] = padre;
                this.recursividadPadres(padre);
            });
        }
        else {
            console.log("Pase Por aqui");
            this.mostrar.push(id);
            console.log(this.mostrar);
        }
    }

    comprobar() {
        let val = false;
        this.esquema.forEach(obj => {
            if (obj.id == this.buscVal.trim() && this.buscVal.trim()) {
                val = true;
            }
        })
        console.log(val);
        if (!this.buscVal.trim()) {
            this.mostrar = this.primN;
            this.desplegados = [];
        }
        console.log(this.mostrar);
        if (val) {
            this.mostrar = [];
            this.desplegados[this.buscVal.trim()] = [this.buscVal.trim()];
            this.recursividadPadres(this.buscVal.trim());
            console.log(this.mostrar)
            console.log(this.desplegados);
        }
    }

    verInfo(item: any) {
        this.importado = this.indiceEsq[item];
        console.log("tengo " + this.importado);
    }

}