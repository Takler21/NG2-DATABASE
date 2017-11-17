import { Component, OnInit } from "@angular/core"
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
    luna: string = "Una cebolla";
    objey: any;
    constructor(private _httpService: HttpService, private _papaParse: PapaParseService) { }

    ngOnInit() {
        this.luna.split(',');
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
        this.esquema.forEach(obj => {
            aux = "";

            if (obj.properties) {
                aux = obj.properties.split(',');
                //console.log("aux - " + Object.keys(aux));
                this.hijas[obj.id] = aux;
                aux.forEach((h: any) => {
                    console.log("Ejem: "+ h + " padre: "+obj.id)
                    this.padres[h] = obj.id;
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


        this.objey = "amor";
    }
    mostrar() {

    }
}