import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { PapaParseService } from 'ngx-papaparse';

@Component({
    selector: 'panel-extra',
    templateUrl: 'app/extra.component.html'
})

export class Extra implements OnInit {
    @Input() id: string;
    @Input() indiceEsq: any[];
    guide: any[];
    literal: any[];
    configuracionHD: any[];
    campos: any[] = [];
    msg: any;
    
    constructor(private _httpService: HttpService, private _papaParse: PapaParseService) { }

    ngOnInit() {
        this._httpService.get("../literales.csv").subscribe(a => {
            this.literal = this._papaParse.parse(a, { header: true, delimiter: "|" }).data;
        },
            error => this.msg = error,
            () => {
                this.crearIndice();
            });

        this._httpService.get("../ConfiguracionHD.csv").subscribe(a => {
            this.configuracionHD = this._papaParse.parse(a).data;
        },
            error => this.msg = error,
            () => {
                this.configHd();
            });
    }

    crearIndice() {
        this.guide = [];
        Object.keys(this.literal[0]).forEach(c => {
            if (c != "id")
                this.campos.push(c);
            });
        this.literal.forEach(post => {
            let aux = post.id.toString();
            if (!this.guide[aux]) {
                this.guide[aux] = [];

                this.guide[aux].push(post);
            }
            else {
                this.guide[aux].push(post);
            }
        });

    }

    configHd() {
        this.configuracionHD.forEach(con => {
            this.configuracionHD[con[0]] = [];
            this.configuracionHD[con[0]].push(con[1], con[2], con[3], con[4], con[5], con[6], con[7], con[8], con[9], con[10], con[11]);
        });
    }

}