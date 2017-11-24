import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { PapaParseService } from 'ngx-papaparse';

//Este componente es usado de forma recursiva para abarcar todos los niveles del arbol.
//Ira descendiendo hasta el ultimo nivel posible
@Component({
    selector: 'panel-extra',
    templateUrl: 'app/extra.component.html'
})

export class Extra implements OnInit {
    @Input() id: string;
    @Input() indiceEsq: any;
    literal: any[];
    campos: any[];
    msg: any;
    //Podria construir una funcion que me permitiera comprobar si tiene hijos
    //para aplicar solo en esos casos el collapse, por ejemplo con un booleano
    constructor(private _httpService: HttpService, private _papaParse: PapaParseService) { }

    ngOnInit() {
        this._httpService.get("../literales.csv").subscribe(a => {
            this.literal = this._papaParse.parse(a, { header: true, delimiter: "|"}).data;
            console.log(this.literal);
        },
            error => this.msg = error,
            () => {
                console.log(this.literal);
                this.literal.forEach(post => {

                })
            });
    }
}